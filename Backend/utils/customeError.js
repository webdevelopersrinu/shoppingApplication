export class CustomeError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.status = statusCode >= 400 && statusCode < 500 ? "Fail" : "Error";
    this.statusCode = statusCode;
    this.isOptional = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
