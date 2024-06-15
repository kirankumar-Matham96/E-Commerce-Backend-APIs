import express from "express";
import LikeController from "./like.controller.js";

const likeController = new LikeController();
const router = express.Router();
router.get("/", (req, res, next) => likeController.getLikes(req, res, next));
router.post("/like", (req, res, next) =>
  likeController.getLikes(req, res, next)
);

export default router;
