import { Router } from "express";
import usersController from "../controllers/users.js";

const usersRouter = Router();

usersRouter
  .route("/")
  .post(usersController.post)
  .put(usersController.put)
  .delete(usersController.deleteUser);

export default usersRouter;
