import express from "express";
import LikeController from "./like.controller.js";

const likeController = new LikeController();
const router = express.Router();
router.get("/", (req, res, next) => likeController.getAllLikes(req, res, next));
router.get("/by-type/:id", (req, res, next) =>
  likeController.getTypeLikes(req, res, next)
);
router.post("/like", (req, res, next) =>
  likeController.likeItem(req, res, next)
);

export default router;
