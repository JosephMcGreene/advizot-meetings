import { Router } from "express";
import {
  putToSignIns,
  deleteToSignIns,
  getToGroup,
} from "../controllers/signIns.js";

const signInRouter = Router();

signInRouter
  .route("/")
  .put(async function (req, res) {
    putToSignIns(req, res);
  })
  .delete(async function (req, res) {
    deleteToSignIns(req, res);
  });

signInRouter.route("/:group").get(async function (req, res) {
  getToGroup(req, res);
});

export default signInRouter;
