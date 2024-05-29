import { body, validationResult } from "express-validator";

class UserValidations {
  validateUserSignUp = async (req, res, next) => {
    try {
      const { name, email, password, typeOfUser } = req.body;

      await body("name").notEmpty().withMessage("Name is required").run(req);
      await body("email")
        .notEmpty()
        .isEmail()
        .withMessage("Valid email is required")
        .run(req);
      await body("password")
        .notEmpty()
        .withMessage("Password is required")
        .run(req);
      await body("type").notEmpty().withMessage("Type is required").run(req);

      const validationResults = validationResult(req);

      if (validationResults.array().length > 0) {
        return res
          .status(400)
          .send({ error: validationResults.array()[0].msg });
      }

      next();
    } catch (error) {
      console.log(error);
    }
  };

  validateUserSignIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      await body("email")
        .notEmpty()
        .isEmail()
        .withMessage("Valid email is required")
        .run(req);
      await body("password")
        .notEmpty()
        .withMessage("Password is required")
        .run(req);

      const validationResults = validationResult(req);

      if (validationResults.array().length > 0) {
        return res
          .status(400)
          .send({ error: validationResults.array()[0].msg });
      }

      next();
    } catch (error) {
      console.log(error);
    }
  };
}
export default UserValidations;
