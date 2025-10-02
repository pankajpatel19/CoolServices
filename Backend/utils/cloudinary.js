import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadfIle = async (localfile) => {
  try {
    if (!localfile) return null;

    const response = await cloudinary.uploader.upload(localfile, {
      resource_type: "auto",
    });

    if (fs.existsSync(localfile)) {
      //remove file from the server
      fs.unlinkSync(localfile);
    }

    return response;
  } catch (error) {
    // console.log("cloudinary error", error);

    if (fs.existsSync(localfile)) {
      //remove file from the server
      fs.unlinkSync(localfile);
    }
    return null;
  }
};

export { uploadfIle };
