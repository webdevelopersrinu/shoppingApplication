import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "place enter your name."],
  },
  description: {
    type: String,
    required: [true, "place enter your description."],
  },
  price: {
    type: Number,
    required: [true, "place enter your price."],
  },
  image: {
    type: Array,
    required: [true, "place enter your image."],
  },
  category: {
    type: String,
    required: [true, "place enter your categery."],
  },
  subCategory: {
    type: String,
    required: [true, "place enter your sub categery."],
  },
  sizes: {
    type: Array,
    required: [true, "place enter your size."],
  },
  bestseller: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Number,
    required: [true, "place enter your data."],
  },
});

const product =
  mongoose.models.product || mongoose.model("product", productSchema);

export default product;
