import express from "express";
import { admin, login, registor } from "../controllers/authController.js";

export const AuthRoutse = express.Router();

AuthRoutse.route("/registor").post(registor);
AuthRoutse.route("/login").post(login);
AuthRoutse.route("/admin").post(admin);
