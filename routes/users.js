import { Router } from "express";
import usersController from "../controllers/users.js";

const usersRouter = Router();

usersRouter
  .route("/")
  .post(usersController.getUsersInGroup)
  .put(usersController.moveUser)
  .delete(usersController.deleteUser);

export default usersRouter;
