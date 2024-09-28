import product from "../models/product.js";
import { asyncError } from "../utils/asyncError.js";
import { v2 as cloudinary } from "cloudinary";
import { CustomeError } from "../utils/customeError.js";
import mongoose from "mongoose";

const addProduct = asyncError(async (req, res, next) => {
  const { name, description, price, category, subCategory, sizes, bestseller } =
    req.body;
  const image1 = req.files.image1 && req.files.image1[0];
  const image2 = req.files.image2 && req.files.image2[0];
  const image3 = req.files.image3 && req.files.image3[0];
  const image4 = req.files.image4 && req.files.image4[0];

  const images = [image1, image2, image3, image4].filter(
    (item) => item !== undefined
  );
  const imageUrls = await Promise.all(
    images.map(async (item) => {
      let result = await cloudinary.uploader.upload(item.path, {
        resource_type: "image",
      });
      return result.secure_url;
    })
  );

  const newProducte = {
    name,
    description,
    price: Number(price),
    category,
    subCategory,
    sizes: JSON.parse(sizes),
    bestseller: bestseller === "true" ? true : false,
    date: Date.now(),
    image: imageUrls,
  };

  const createdProducte = new product(newProducte);
  createdProducte.save();
  res.status(200).json({
    status: "success",
    message: "producte add successfully",
  });
});

const removeProduct = asyncError(async (req, res, next) => {
  console.log(req.body);
  const deleteProducte = await product.findByIdAndDelete(req.body.id);
  console.log(deleteProducte);
  if (!deleteProducte) {
    let err = new CustomeError("producte is not find this id", 404);
    return next(err);
  }
  res.status(200).json({
    status: "success",
    message: "remove producte",
  });
});

const listProduct = asyncError(async (req, res, next) => {
  const listOfProducts = await product.find();
  res.status(200).json({
    status: "success",
    products: listOfProducts,
  });
});

const singleProduct = asyncError(async (req, res, next) => {
  console.log(req.body.id);
  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.body.id)) {
    let err = new CustomeError("Invalid ID", 400);
    return next(err);
  }

  const getProduct = await product.findById(req.body.id);

  if (!getProduct) {
    let err = new CustomeError("producte is not find this id", 404);
    return next(err);
  }
  res.status(200).json({
    status: "success",
    product: getProduct,
  });
});

export { addProduct, removeProduct, listProduct, singleProduct };
