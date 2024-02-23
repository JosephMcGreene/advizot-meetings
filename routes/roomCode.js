import { Router } from "express";
import { postToRoomCode, putToRoomCode } from "../controllers/roomCode.js";

const roomCodeRouter = Router();

roomCodeRouter
  .route("/")
  .post(async function (req, res) {
    postToRoomCode(req, res);
  })
  .put(async function (req, res) {
    putToRoomCode(req, res);
  });

export default roomCodeRouter;
