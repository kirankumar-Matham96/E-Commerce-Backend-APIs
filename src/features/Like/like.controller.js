import LikeRepository from "./like.repository.js";
import { ApplicationError } from "../../middleware/customErrorHandling.middleware.js";

class LikeController {
  constructor() {
    this.likeRepo = new LikeRepository();
  }

  likeItem = async (req, res, next) => {
    try {
      const { id, type } = req.body;
      const userId = req.userId;

      if (type != "product" && type != "category") {
        throw new ApplicationError("invalid type", 400);
      }

      if (type == "product") {
        await this.likeRepo.likeProduct(userId, id);
      } else {
        await this.likeRepo.likeCategory(userId, id);
      }

      res.status(200).send("Item liked");
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  getAllLikes = async (req, res, next) => {
    try {
      const userId = req.userId;
      const likes = await this.likeRepo.getAllLikes(userId);
      res.status(200).send(likes);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  getTypeLikes = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { type } = req.body;
      const likes = await this.likeRepo.getTypeLikes(id, type);
      res.status(200).send(likes);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default LikeController;
