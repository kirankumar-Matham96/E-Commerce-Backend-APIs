import express from "express";
import {router as ProductRouter} from "./src/features/product/products.routes.js";

const PORT = 3600;
const app = express();


app.get("/", (req, res) => {
  console.log("Welcome to E-Commerce API");
  res.send({ message: "Welcome to E-Commerce API" });
});


// for all the request s related to products, redirect to product routes.
app.use("/api/products", ProductRouter)


app.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`);
});
