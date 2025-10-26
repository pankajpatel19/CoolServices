const { Complain } = require("../../Models/Complaint");

const SubmitComplaints = async (req, res) => {
  try {
    const complaint = new Complain({ ...req.body, user: req.user.id });

    await complaint.save();

    res
      .status(200)
      .json({ success: true, message: "Complaint submitted successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ success: false, message: "Server error" });
  }
};

const ShowComplaints = async (req, res) => {
  try {
    const complaint = await Complain.find({ user: req.params.id });
    res.status(200).json({
      success: true,
      message: "Complaint submitted successfully",
      complaint,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
module.exports = { SubmitComplaints, ShowComplaints };
