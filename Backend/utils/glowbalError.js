import { CustomeError } from "./customeError.js";

function proErr(res, err) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
}

function devErr(res, err) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stackTrace: err.stack,
    err,
  });
}

// ValidationErrorHandeler
function ValidationErrorHandeler(err) {
  let message = err.message;
  return new CustomeError(message, 401);
}

// duplicateKeyHandeler
function duplicateKeyHandeler(err) {
  let message = `this ${Object.keys(err.keyValue)[0]} ${
    Object.values(err.keyValue)[0]
  } alredy exsite`;
  return new CustomeError(message, 401);
}

export function globalErrorHandeler(err, req, res, next) {
  err.status = err.status || "Error";
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === "production") {
    if (err.name === "ValidationError") {
      err = ValidationErrorHandeler(err);
    }
    if (err.code === 11000) {
      err = duplicateKeyHandeler(err);
    }
    proErr(res, err);
  } else if (process.env.NODE_ENV === "develeopment") {
    devErr(res, err);
  }
}
