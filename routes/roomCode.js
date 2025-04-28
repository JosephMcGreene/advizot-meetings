import { Router } from "express";
import roomCodeController from "../controllers/roomCode.js";

const roomCodeRouter = Router();

roomCodeRouter
  .route("/")
  .post(roomCodeController.checkRoomCode)
  .put(roomCodeController.updateRoomCode);

export default roomCodeRouter;
