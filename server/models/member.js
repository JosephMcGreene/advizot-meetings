const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
	businessHealth: { type: Number },
	personalHealth: { type: Number },
	relationshipHealth: { type: Number },
	monthlyIssue: { type: String },
	priority: { type: String },
	monthlyGoal: { type: String },
});

const memberSchema = new mongoose.Schema({
	firstName: { type: String },
	lastName: { type: String },
	coachID: { type: Number },
	response: responseSchema,
});

module.exports = mongoose.model("Member", memberSchema);

//=====NOTES FOR USING MONGOOSE=====
// 	main: async () => {
// 		//Connect to the database
// 		await mongoose.connect(process.env.MONGO_URI);

// 		//add a Schema, which is sort of a class for classes
// 		const memberSchema = new mongoose.Schema({
// 			name: String,
// 			coachID: Number,
// 			methods: Array,
// 		});

// 		//Add an instance of the schema:
// 		const Member = mongoose.model("Member", memberSchema);

// 		//Now instantiate the model:
// 		const joseph = new Member({
// 			name: "Joseph McGreene",
// 			coachID: 87337,
// 			methods: [],
// 		});

// 		//Save it to the database:
// 		await joseph.save();

// 		//Now get it from the database:
// 		const members = await Member.find();
// 		console.log(members);
// 	},
