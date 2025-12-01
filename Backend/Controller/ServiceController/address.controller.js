import Address from "../../Models/Address.model.js";

export const add_address = async (req, res) => {
  try {
    const newAddress = new Address({
      ...req.body,
      user: req.user.id,
    });
    await newAddress.save();
    res.status(200).json({ message: "Address Saved SuccessFully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something Went Wrong" });
  }
};

export const show_address = async (req, res) => {
  try {
    const Addresses = await Address.find({ user: req.params.id });
    res
      .status(200)
      .json({ message: "Address Fetched SuccessFully", Addresses });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

export const delete_address = async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Address Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

export const PaymentDetails = async (req, res) => {
  try {
    const details = await Address.findById(req.params.id).populate(
      "user",
      "username email phone avatar"
    );
    res.status(200).json({ message: "details fetched", details });
  } catch (error) {
    console.log(error);
  }
};
