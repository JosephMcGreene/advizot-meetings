import { Router } from "express";
import { postToUsers, putToUsers } from "../controllers/users.js";

const usersRouter = Router();

usersRouter
  .route("/")
  .post(async function (req, res) {
    postToUsers(req, res);
  })
  .put(async function (req, res) {
    putToUsers(req, res);
  });

export default usersRouter;
