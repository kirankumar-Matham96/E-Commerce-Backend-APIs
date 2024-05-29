import express from "express";
import { router as ProductRouter } from "./src/features/product/products.routes.js";
import { router as UserRouter } from "./src/features/user/user.routes.js";
import basicAuthorizer from "./src/middleware/basicAuth.middleware.js";

const PORT = 3600;
const app = express();

app.get("/", (req, res) => {
  console.log("Welcome to E-Commerce API");
  res.send({ message: "Welcome to E-Commerce API" });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// for all the requests related to products, redirect to product routes.
app.use("/api/products", basicAuthorizer, ProductRouter);

// for user requests related to register and login
app.use("/api/users", UserRouter);

app.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`);
});
