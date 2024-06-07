import express from "express";
import fs from "fs";
import path from "path";
import cookiesParser from "cookie-parser";
import swagger from "swagger-ui-express";
import cors from "cors";

import ProductRouter from "./src/features/product/products.routes.js";
import UserRouter from "./src/features/user/user.routes.js";
import CartRouter from "./src/features/cart/cart.routes.js";
// import basicAuthorizer from "./src/middleware/basicAuth.middleware.js";
import { jwtAuth } from "./src/middleware/jwtAuth.middleware.js";
import { errorHandlerMiddleware } from "./src/middleware/customErrorHandling.middleware.js";
import { loggerMiddleware } from "./src/middleware/logger.middleware.js";
import { invalidRoutesMiddleware } from "./src/middleware/invalidRoutes.middleware.js";
import connectToDB from "./src/config/mongodb.js";

// reading swagger config file
const swaggerFilePath = path.join(path.resolve(), "swagger.json");
const apiDocs = JSON.parse(fs.readFileSync(swaggerFilePath, "utf8"));

const PORT = 3600;
const app = express();

// cors policy config
app.use(cors());

// swagger-docs api
app.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

app.get("/", (req, res) => {
  console.log("Welcome to E-Commerce API");
  res.send({ message: "Welcome to E-Commerce API" });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookiesParser());

// logger middleware
app.use(loggerMiddleware);

// for all the requests related to products, redirect to product routes.
app.use("/api/products", jwtAuth, ProductRouter);

// for all requests related to cart.
app.use("/api/cart", jwtAuth, CartRouter);

// for user requests related to register and login
app.use("/api/users", UserRouter);

// custom error handling middleware
app.use(errorHandlerMiddleware);

// middleware to handle 404 requests
app.use(invalidRoutesMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`);
  // connecting to mongodb
  connectToDB();
});
