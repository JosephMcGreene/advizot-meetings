import { Router } from "express";
import signInsController from "../controllers/signIns.js";

const signInRouter = Router();

signInRouter
  .route("/")
  .put(signInsController.modifySignIn)
  .delete(signInsController.deleteSignIn);

signInRouter.route("/:group").get(signInsController.getGroupSignIns);

export default signInRouter;
