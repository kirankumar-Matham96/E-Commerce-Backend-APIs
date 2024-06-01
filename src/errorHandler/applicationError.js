export class ApplicationError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.code = statusCode;
  }
}
