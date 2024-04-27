import { Router } from "express";
import profileController from "../controllers/profile.js";

const profileRouter = Router();

profileRouter.route("/").post(profileController.post);

export default profileRouter;
