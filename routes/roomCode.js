import { Router } from "express";
import roomCodeController from "../controllers/roomCode.js";

const roomCodeRouter = Router();

roomCodeRouter
  .route("/")
  .post(roomCodeController.post)
  .put(roomCodeController.put);

export default roomCodeRouter;
