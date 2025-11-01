import redisCLient from "../../config/redis.config.js";
import { Complain } from "../../Models/Complaint.model.js";

export const SubmitComplaints = async (req, res) => {
  try {
    const complaint = new Complain({ ...req.body, user: req.user.id });

    await complaint.save();

    res
      .status(200)
      .json({ success: true, message: "Complaint submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const ShowComplaints = async (req, res) => {
  try {
    const redisComplaints = await redisCLient.get("complaints");

    if (redisComplaints) {
      return res.status(200).json(JSON.parse(redisComplaints));
    }

    const complaint = await Complain.find({ user: req.params.id });

    await redisCLient.set("complaints", JSON.stringify(complaint));

    res.status(200).json({
      success: true,
      message: "Complaint submitted successfully",
      complaint,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
