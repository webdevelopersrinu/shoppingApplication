import JWT from "jsonwebtoken";
import { asyncError } from "../utils/asyncError.js";
import { CustomeError } from "../utils/customeError.js";

const adminAuth = asyncError(async (req, res, next) => {
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
  if (decodeToken !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
    const err = new CustomeError(
      "your not acssses to perform this operation",
      401
    );
    return next(err);
  }
  next();
});

export { adminAuth };
