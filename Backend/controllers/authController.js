import JWT from "jsonwebtoken";
import user from "../models/user.js";
import { asyncError } from "../utils/asyncError.js";
import { CustomeError } from "../utils/customeError.js";

export const registor = asyncError(async (req, res, next) => {
  const newUser = await user.create(req.body);
  const token = JWT.sign({ id: newUser.id }, process.env.SCRETE_STR, {
    expiresIn: process.env.LOGIN_EXPAIER,
  });

  res.status(200).json({
    status: "success",
    message: "user registor successfully",
    token,
  });
});

export const login = asyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const existeUser = await user.findOne({ email });
  if (!existeUser) {
    const err = new CustomeError("user not existe this email id", 400);
    return next(err);
  }
  const isPasswordCurrecte = await existeUser.compairePassword(
    password,
    existeUser.password
  );
  if (!isPasswordCurrecte) {
    const err = new CustomeError("password is worng!", 400);
    return next(err);
  }
  const token = JWT.sign({ id: existeUser.id }, process.env.SCRETE_STR, {
    expiresIn: process.env.LOGIN_EXPAIER,
  });
  res.status(200).json({
    status: "success",
    message: "user login successfully",
    token,
  });
});

export const admin = asyncError(async (req, res, next) => {
  
  const { email, password } = req.body;
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = JWT.sign(email + password, process.env.SCRETE_STR);
    res.status(200).json({
      status: "success",
      token,
    });

  } else {
    res.status(401).json({
      status: "Fail",
      message: "invalid credentials",
    });
  }
});
