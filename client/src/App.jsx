//! Overall Goals:
//!    - Easy and Fast to use
//!    - Secure Server Sign-In
//!    - Answers to sign-in questions to be used during the course of the meeting via a projector
//!    (- POST data to Coach Accountable to be stored as a metric for user later on)
//TODO (1) Add user
//TODO			- settings
//TODO			- ability to delete/change their own responses
//TODO (- POST data to Coach Accountable. Add ability to remove the data as well.)

//? In what order should the priorities be organized? What does each priority answer mean? Should "C" come before "Question" & "Lightning"?

//React
import { useState, useEffect } from "react";
//Internal
import "./scss/App.scss";
import Header from "./components/Header";
import Login from "./components/Login";
import MeetingForm from "./components/form/MeetingForm";
import Responses from "./components/Responses";
import Footer from "./components/Footer";
//External
import { Routes, Route } from "react-router-dom";

export default function App() {
	const [responses, setResponses] = useState([]);

	//=====EFFECTS=====
	useEffect(() => {
		getExistingResponses();
	}, []);

	//=====HELPERS=====
	/**
	 * A shorthand function to avoid typing out verbose code whenever fetch() needs to be used to get json data
	 * @param {String} url 		The url which data is got from, post to, etc.
	 * @param {String} method http method being used: GET, POST, PUT, etc.
	 * @param {Object} body 	Optional: json data to be POSTed, DELETEd, etc.
	 */
	async function fetchData(url, method, body) {
		try {
			const fetchResponse = await fetch(url, {
				method: method,
				credentials: "include",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});
			const json = await fetchResponse.json();
			return json;
		} catch (error) {
			console.error(error);
		}
	}

	/**
	 * fetches existing user responses from MongoDB and updates state accordingly. See server/routes/db.js
	 */
	async function getExistingResponses() {
		const existingResponses = await fetchData("/db/responses", "GET");
		if (existingResponses && existingResponses.length > 0) {
			setResponses([...existingResponses]);
		}
	}

	// async function getCurrentUser() {
	// 	const userData = await fetchData("/", "GET");
	// 	if (userData) {
	// 		userData.user.json();
	// 	}
	// 	console.log(userData);
	// }

	/**
	 * Takes in and distributes responses from MeetingForm.js to the appropriate places: MongoDB and/or Coach Accountable. See server/routes/db.js
	 * @param {Object} userResponse json body to be posted and displayed to the users
	 */
	async function submitResponses(userResponse) {
		await fetchData("/db/responses", "POST", userResponse);
		setResponses([...responses, userResponse]);
	}

	// DELETES EVERY SINGLE USER RESPONSE ENTRY IN DATABASE
	/**
	 * Deletes the current slate of documents from MongoDB. See server/routes/db.js
	 */
	async function deleteAllResponses() {
		if (responses.length === 0) {
			return;
		}
		const deleteRes = await fetchData("/db/responses", "DELETE", responses);
		await alert(`Deleted ${deleteRes.deletedCount} item(s) from the database.`);
		setResponses([]);
	}

	// async function handleLogin() {
	// 	const loginResponse = await fetchData("/auth/linkedin", "GET");
	// 	console.log(loginResponse.user);
	// }

	return (
		<div className="App">
			<Header />
			<Routes>
				{/* <Route path="/" element={<h1 className="welcome">Welcome!</h1>} /> */}
				<Route
					path="/"
					element={
						<MeetingForm
							onSubmit={(userResponse) => submitResponses(userResponse)}
						/>
					}
				/>
				<Route
					path="/responses"
					element={<Responses responses={responses} />}
				/>
			</Routes>
			{/* <MeetingForm onSubmit={(userResponse) => submitResponses(userResponse)} />
			<Responses responses={responses} /> */}

			<a href="/auth/loggedIn">
				<button className="btn">Am I logged in?</button>
			</a>
			<button className="btn" onClick={() => deleteAllResponses()}>
				Delete All Responses
				<br />
				(Please use after testing)
			</button>
			<Footer />
		</div>
	);
}
