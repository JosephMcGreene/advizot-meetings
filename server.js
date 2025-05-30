import { config } from "dotenv";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import cookieSession from "cookie-session";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import path from "path";
// Internal Modules
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import roomCodeRouter from "./routes/roomCode.js";
import signInRouter from "./routes/signIns.js";
import usersRouter from "./routes/users.js";
import "./lib/passportConfig.js";

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
    keys: [uuidv4()],
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
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
}

//=====MOUNT ROUTES=====
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/roomCode", roomCodeRouter);
app.use("/signIns", signInRouter);
app.use("/users", usersRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"), (err) => {
    if (err) res.status(500).send(err);
  });
});

//=====SERVER START=====
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
