import LikeRepository from "./like.repository";
import { ApplicationError } from "../../middleware/customErrorHandling.middleware.js";

class LikeController {
  constructor() {
    this.likeRepo = new LikeRepository();
  }

  likeItem = async (req, res, next) => {
    try {
      const { id, type } = req.body;
      const userId = req.userId;

      if (type != "products" || type != "categories") {
        throw new ApplicationError("invalid type", 400);
      }

      if (type == "products") {
        await this.likeRepo.likeProduct(userId, id);
      } else {
        await this.likeRepo.likeCategory(userId, id);
      }
      
    } catch (error) {
      console.log(error);
      next(error);
      // res.status(500).send("something went wrong");
    }
  };

  getLikes = async (req, res, next) => {
    try {
      const {} = req;
      const userId = req.userId;
      this.likeRepo;
    } catch (error) {
      console.log(error);
      next(error);
      // res.status(500).send("something went wrong");
    }
  };
}

export default LikeController;
