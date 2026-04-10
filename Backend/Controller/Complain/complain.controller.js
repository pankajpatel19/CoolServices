import { Complain } from "../../Models/Complaint.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { complaintSchema } from "../../MiddleWare/Joi.middleware.js";

export const SubmitComplaints = async (req, res, next) => {
  try {
    const { error, value } = complaintSchema.validate(req.body);
    console.log(error);

    if (error) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, error.details[0].message));
    }

    const complaint = await Complain.create({
      ...value,
      user: req.user?.id || req.user?._id,
    });

    return res
      .status(201)
      .json(
        new ApiResponse(201, complaint, "Complaint submitted successfully"),
      );
  } catch (error) {
    next(error);
  }
};

export const ShowComplaints = async (req, res, next) => {
  try {
    const userId = req.params.id || req.user?.id || req.user?._id;

    const complaints = await Complain.find({ user: userId }).sort({
      createdAt: -1,
    });

    return res
      .status(200)
      .json(
        new ApiResponse(200, complaints, "Complaints fetched successfully"),
      );
  } catch (error) {
    next(error);
  }
};
