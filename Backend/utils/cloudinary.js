import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import { existsSync } from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

/**
 * Uploads a local file to Cloudinary and deletes the local copy.
 * @param {string} localFilePath - Path to the local file.
 * @returns {Object|null} - Cloudinary response or null on failure.
 */
export const uploadFile = async (localFilePath) => {
  if (!localFilePath) return null;

  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    return response;
  } catch (error) {
    console.error(`[Cloudinary] Upload failed for ${localFilePath}:`, error.message);
    return null;
  } finally {
    // Always attempt to delete the local file after upload attempt
    try {
      if (existsSync(localFilePath)) {
        await fs.unlink(localFilePath);
      }
    } catch (cleanupError) {
      console.error(`[Cloudinary] Cleanup failed for ${localFilePath}:`, cleanupError.message);
    }
  }
};
