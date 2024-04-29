import { Router } from "express";
import usersController from "../controllers/users.js";

const usersRouter = Router();

usersRouter
  .route("/")
  .post(usersController.post)
  .put(usersController.put)
  .delete(usersController.deleteUser)
  .route("/profile")
  .post(usersController.postProfile);

export default usersRouter;
