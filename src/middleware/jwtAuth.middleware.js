import jwt from "jsonwebtoken";

export const jwtAuth = (req, res, next) => {
  // read token from cookies
  // const token = req.cookies.jwtToken;

  // read token from request headers
  const token = req.headers["authorization"];

  // if no token return the error
  if (!token) {
    return res
      .status(401)
      .json({ status: "failure", error: "Unauthorized access" });
  }

  // if token is present, we need to check if it is valid
  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = payload.id;
  } catch (error) {
    return res
      .status(401)
      .json({ status: "failure", error: "Unauthorized access" });
  }

  // if token is valid, call next
  next();
};
