import mongoose, { mongo, Schema } from "mongoose";

const AddressSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  addressType: {
    type: String,
    required: true,
  },
});

const Address = mongoose.model("Address", AddressSchema);

export default Address;
