export const invalidRoutesMiddleware = (req, res, next) => {
  res
    .status(404)
    .send("API Not Found. Please look our API Documentation at /api-docs");
};
