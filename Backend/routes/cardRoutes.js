import express from "express";
import { auth } from "../middleware/auth.js";
import {
  addToCard,
  getUserCart,
  updateCard,
} from "../controllers/cardController.js";

export const CardRoutse = express.Router();

CardRoutse.route("/add").post(auth, addToCard);
CardRoutse.route("/update").post(auth, updateCard);
CardRoutse.route("/").post(auth, getUserCart);

