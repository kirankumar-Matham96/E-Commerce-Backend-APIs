import express from "express";

const PORT = 3600;
const app = express();

app.get("/", (req, res) => {
  console.log("Welcome to E-Commerce API");
  res.send({ message: "Welcome to E-Commerce API" });
});

app.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`);
});
