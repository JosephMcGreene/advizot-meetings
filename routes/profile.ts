import { Router } from "express";
import profileController from "../controllers/profile.js";

const profileRouter = Router();

profileRouter.route("/").get(profileController.getSignIns);

export default profileRouter;
