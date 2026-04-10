import Address from "../../Models/Address.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const add_address = async (req, res, next) => {
  try {
    const newAddress = await Address.create({
      ...req.body,
      user: req.user?.id || req.user?._id,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, newAddress, "Address saved successfully"));
  } catch (error) {
    next(error);
  }
};

export const show_address = async (req, res, next) => {
  try {
    const userId = req.params.id || req.user?.id || req.user?._id;
    const addresses = await Address.find({ user: userId });
    
    return res.status(200).json(new ApiResponse(200, addresses, "Addresses fetched successfully"));
  } catch (error) {
    next(error);
  }
};

export const delete_address = async (req, res, next) => {
  try {
    const deletedAddress = await Address.findByIdAndDelete(req.params.id);
    if (!deletedAddress) {
      return res.status(404).json(new ApiResponse(404, null, "Address not found"));
    }
    return res.status(200).json(new ApiResponse(200, null, "Address deleted successfully"));
  } catch (error) {
    next(error);
  }
};

export const PaymentDetails = async (req, res, next) => {
  try {
    const details = await Address.findById(req.params.id).populate(
      "user",
      "userName email phone avatar"
    );
    
    if (!details) {
      return res.status(404).json(new ApiResponse(404, null, "Address details not found"));
    }

    return res.status(200).json(new ApiResponse(200, details, "Address details fetched successfully"));
  } catch (error) {
    next(error);
  }
};
