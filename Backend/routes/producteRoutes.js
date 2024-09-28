import express from "express";
import {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct,
} from "../controllers/producteCotroller.js";
import upload from "../middleware/multer.js";
import { adminAuth } from "../middleware/adminAuth.js";

const productRoutes = express.Router();
productRoutes.route("/add").post(
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRoutes.route("/remove").post(adminAuth, removeProduct);
productRoutes.route("/list").get(listProduct);
productRoutes.route("/single").post(singleProduct);

export default productRoutes;
