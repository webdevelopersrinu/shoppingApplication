import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";
import {
  allOrders,
  palceOrder,
  palceOrderRazorpay,
  palceOrderStripe,
  updateOrderStatus,
  userOrders,
} from "../controllers/orderController.js";
import { auth } from "../middleware/auth.js";

export const OrderRoutse = express.Router();

// Admin Features
OrderRoutse.route("/list").post(adminAuth, allOrders);
OrderRoutse.route("/status").post(adminAuth, updateOrderStatus);

// payment Features
OrderRoutse.route("/palce").post(auth, palceOrder);
OrderRoutse.route("/stripe").post(auth, palceOrderStripe);
OrderRoutse.route("/razorpay").post(auth, palceOrderRazorpay);

// user Features
OrderRoutse.route("/userorders").post(auth, userOrders);
