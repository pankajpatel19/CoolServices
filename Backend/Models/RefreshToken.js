import mongoose, { Schema } from "mongoose";

const refreshTokenShcema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true, expires: "7d" }
);

const RefreshToken = mongoose.model("RefreshToken", refreshTokenShcema);
export default RefreshToken;
