import { Complain } from "../../Models/Complaint.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const SubmitComplaints = async (req, res, next) => {
  try {
    const { subject, description, bookingId } = req.body;

    if (!subject || !description) {
      return res.status(400).json(new ApiResponse(400, null, "Subject and description are required"));
    }

    const complaint = await Complain.create({
      ...req.body,
      user: req.user?.id || req.user?._id,
    });

    return res.status(201).json(new ApiResponse(201, complaint, "Complaint submitted successfully"));
  } catch (error) {
    next(error);
  }
};

export const ShowComplaints = async (req, res, next) => {
  try {
    const userId = req.params.id || req.user?.id || req.user?._id;
    const complaints = await Complain.find({ user: userId });

    return res.status(200).json(
      new ApiResponse(200, complaints, "Complaints fetched successfully")
    );
  } catch (error) {
    next(error);
  }
};
