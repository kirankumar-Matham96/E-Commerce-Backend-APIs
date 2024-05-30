import jwt from "jsonwebtoken";
import "dotenv/config";

export const jwtAuth = (req, res, next) => {
  // read token from cookies
  const token = req.cookies.jwtToken;
  // if no token return the error
  if (!token) {
    return res
      .status(401)
      .json({ status: "failure", error: "Unauthorized access" });
  }

  // if token is present, we need to check if it is valid
  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    console.log({ payload });
  } catch (error) {
    console.log("jwt auth error: ", error);
    return res
      .status(401)
      .json({ status: "failure", error: "Unauthorized access" });
  }

  // if token is valid, call next
  next();
};
