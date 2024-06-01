import { errorLoggerMiddleware } from "./logger.middleware.js";
export class ApplicationError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.code = statusCode;
  }
}

export const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof ApplicationError) {
    return res.status(err.code).json({ status: "failure", error: err.message });
  }

  errorLoggerMiddleware(err, req, res, next);
  return res.status(500).json({
    status: "failure",
    error: "Oops! Something went wrong... Please try again later!",
  });
};
