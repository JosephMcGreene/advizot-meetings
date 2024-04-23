import { Router } from "express";
import signInsController from "../controllers/signIns.js";

const signInRouter = Router();

signInRouter
  .route("/")
  .put(signInsController.putToSignIns)
  .delete(signInsController.deleteToSignIns);

signInRouter.route("/:group").get(signInsController.getToGroup);

export default signInRouter;
