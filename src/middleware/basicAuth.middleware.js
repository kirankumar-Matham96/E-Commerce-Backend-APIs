import UserModel from "../features/user/user.model.js";

const basicAuthorizer = (req, res, next) => {
  // checking if authorization header is empty
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res
      .status(401)
      .json({ status: "failure", msg: "No authorization details found" });
  }

  // extracting credentials. [Basic ahw3tfq7265qkj6n9wb45amh1gw2sq]
  const base64Credentials = authHeader.replace("Basic ", "");

  // decode the credentials
  const decodedCredentials = Buffer.from(base64Credentials, "base64").toString(
    "utf8"
  );
  const credentials = decodedCredentials.split(":");
  const validUser = UserModel.getAll().find(
    (user) => user.email === credentials[0] && user.password === credentials[1]
  );

  if (!validUser) {
    return res
      .status(401)
      .json({ status: "failure", error: "Incorrect credentials" });
  }

  next();
};

export default basicAuthorizer;
