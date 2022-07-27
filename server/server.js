//=====REQUIRES=====
require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const { addUser, removeUser } = require("./users");
const cors = require("cors");
const axios = require("axios");
const PORT = process.env.PORT || 8080;
const params = require("./utils/postParams");

//=====MIDDLEWARE=====
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(express.json());

app.use(cors());

const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

//=====ROUTES TO COACH ACCOUNTABLE=====
app.post("/postMetric", cors(), (req, res) => {
	axios
		.request({
			method: "post",
			url: coachAccountableURL,
			params: params.postParams,
		})
		.then((response) => console.log(response))
		.catch((error) => console.error(error));
});

app.get("/deleteMetric", cors(), (req, res) => {
	axios
		.request({
			method: "post",
			url: coachAccountableURL,
			params: params.deleteParams,
		})
		.then((response) => console.log(response))
		.catch((error) => console.error(error));
});

//=====SOCKET EVENTS=====
io.on("connection", (socket) => {
	console.log(socket.id);

	socket.on("send_message", (data) => {
		socket.broadcast.emit("receive_message", data);
	});
});

if (process.env.NODE_ENV === "production") {
	app.use(express.static("./client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
	});
}

//=====SERVER START=====
server.listen(PORT, () => {
	console.log(`Server is listening at http://localhost:${PORT}`);
});
