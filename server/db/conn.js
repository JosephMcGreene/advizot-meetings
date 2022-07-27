require("dotenv").config();
const { MongoClient } = require("mongodb");
const dbURI = process.env.ATLAS_URI;
const client = new MongoClient(dbURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

let _db;

module.exports = {
	connectToServer: (callback) => {
		client.connect((err, db) => {
			if (db) {
				_db = db.db("members");
				console.log(db);
			}
			return callback(err);
		});
	},

	getDb: () => {
		return _db;
	},
};
