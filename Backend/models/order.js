import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "userId is required"],
  },
  items: {
    type: Array,
    required: [true, "items is required"],
  },
  amount: {
    type: Number,
    required: [true, "amount is required"],
  },
  address: {
    type: Object,
    required: [true, "address is required"],
  },
  status: {
    type: String,
    required: [true, "status is required"],
  },
  paymentMethod: {
    type: String,
    required: [true, "paymentMethod is required"],
  },
  payment: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Number,
    required: [true, "date is required"],
  },
});

const order = mongoose.models.order || mongoose.model("order", orderSchema);

export default order;
