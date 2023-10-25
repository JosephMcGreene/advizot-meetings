import { config } from "dotenv";
import path from "path";
import express from "express";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import { uuid } from "uuidv4";
import cors from "cors";
import passport from "passport";
//Internal Modules
import dbRouter from "./routes/db";
import authRouter from "./routes/auth";
import roomCodeRouter from "./routes/roomCode";
import usersRouter from "./routes/users";
import "./utils/passportConfig";

config();
const app = express();

//=====CONNECT MONGODB=====
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((error) => console.error(error));

//=====MIDDLEWARE=====
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cookieSession({
    maxAge: 1000 * 60 * 60 * 24, // cookie expires in 1 day
    keys: [uuid()],
  })
);

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//=====IN PROD=====
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
}

//=====MOUNT ROUTES=====
app.use("/db", dbRouter);
app.use("/auth", authRouter);
app.use("/roomCode", roomCodeRouter);
app.use("/users", usersRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

//=====SERVER START=====
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
