import JWT from "jsonwebtoken";
import { asyncError } from "../utils/asyncError.js";
import { CustomeError } from "../utils/customeError.js";
import user from "../models/user.js";

const auth = asyncError(async (req, res, next) => {
  const token = req.headers.authorization;
  let jwtToken;
  if (token && token.startsWith("Bearer")) {
    jwtToken = token.split(" ")[1];
  }
  jwtToken = jwtToken === "null" ? null : jwtToken;
  if (!jwtToken) {
    const err = new CustomeError("your not login place login", 401);
    return next(err);
  }
  const decodeToken = JWT.verify(jwtToken, process.env.SCRETE_STR);
  const isUserExist=await user.findById(decodeToken.id)
  if(!isUserExist){
    const err = new CustomeError("user is not exist", 404);
    return next(err);
  }
  req.body.userId = decodeToken.id;
  next();
});

export { auth };
