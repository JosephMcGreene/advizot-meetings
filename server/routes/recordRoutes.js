// const express = require("express");
// const recordRoutes = express.Router();
// const dbo = require("../db/conn");
// const ObjectId = require("mongodb").ObjectId;

// //Get list of all records
// recordRoutes.route("/record").get((req, res) => {
// 	let db_connect = dbo.getDb("members");
// 	db_connect
// 		.collection("records")
// 		.find({})
// 		.toArray((error, result) => {
// 			if (error) throw err;
// 			res.json(result);
// 		});
// });

// //Get a single rcord by id
// recordRoutes.route("/record/:id").get((req, res) => {
// 	let db_connect = dbo.getDb();
// 	let myQuery = { _id: ObjectId(req.params.id) };
// 	db_connect.collection("records").findOne(myQuery, (error, result) => {
// 		if (error) throw err;
// 		res.json(result);
// 	});
// });

// //Create a new record
// recordRoutes.route("/record/add").post((req, res) => {
// 	let db_connect = dbo.getDb();
// 	let newData = {
// 		name: req.body.name,
// 	};
// 	db_connect.collection("records").incertOne(newData, (error, result) => {
// 		if (error) throw err;
// 		res.json(result);
// 	});
// });

// //Update a record
// recordRoutes.route("/update/:id").post(function (req, response) {
// 	let db_connect = dbo.getDb();
// 	let myquery = { _id: ObjectId(req.params.id) };
// 	let newvalues = {
// 		$set: {
// 			name: req.body.name,
// 			position: req.body.position,
// 			level: req.body.level,
// 		},
// 	};
// });

// //Delete a record
// recordRoutes.route("/:id").delete((req, response) => {
// 	let db_connect = dbo.getDb();
// 	let myquery = { _id: ObjectId(req.params.id) };
// 	db_connect.collection("records").deleteOne(myquery, function (err, obj) {
// 		if (err) throw err;
// 		console.log("1 document deleted");
// 		response.json(obj);
// 	});
// });

// module.exports = recordRoutes;
