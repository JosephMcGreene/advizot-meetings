const LocalStrategy = require("passport-local").Strategy;

function initialize(passport) {
	const authenticateUser = (email, password, done) => {
		const user = getUserByEmail(email);
		if (user === null) {
			return done(null, false, { message: "No user with that email" });
		}
	};

	passport.use(new LocalStrategy({ usernameField: "email" }), authenticateUser);
	passport.serializeUser((user, done) => {});
	passport.deserializeUser((id, done) => {});
}

module.exports = initialize;
