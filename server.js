import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import passport from "passport";
//Internal Modules
import signInRouter from "./routes/signIns.js";
import authRouter from "./routes/auth.js";
import roomCodeRouter from "./routes/roomCode.js";
import usersRouter from "./routes/users.js";
import "./utils/passportConfig.js";

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
app.use("/signIns", signInRouter);
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
