//! Overall Goals:
//!    - Easy and Fast to use
//!    - Secure Server Sign-In
//!    - Answers to sign-in questions to be used during the course of the meeting via a projector
//!    (- POST data to Coach Accountable to be stored as a metric for user later on)
//TODO (1) Figure out Axios configuration
//TODO (2) Add user
//TODO			- settings
//TODO			- ability to delete/change their own responses
//TODO (- POST data to Coach Accountable. Add ability to remove the data as well.)

//React
import { useState, useEffect } from "react";
//Internal
import "./scss/App.scss";
import Header from "./components/Header";
import MeetingForm from "./components/form/MeetingForm";
import Responses from "./components/Responses";
import Footer from "./components/Footer";
//External
import axios from "axios";

export default function App() {
	const [responses, setResponses] = useState([]);
	const [currentUser, setCurrentUser] = useState({});

	//=====EFFECTS=====
	useEffect(() => {
		/**
		 * makes ajax request for details on the current user, defined to keep useEffect happy by remaining "synchronous" *eyeroll*
		 * @param {String} url
		 */
		async function axiosGet(url) {
			try {
				const current_user = await axios.get(url);
				console.log(current_user);
				setCurrentUser(current_user.data);
			} catch (error) {
				console.error(error);
			}
		}
		axiosGet("/api/current_user");
	}, []);

	useEffect(() => {
		getExistingResponses();
	}, []);

	//=====HELPERS=====
	/**
	 * fetches existing user responses from MongoDB and updates state accordingly. See server/routes/db.js
	 */
	async function getExistingResponses() {
		const existingResponses = await axios.get("/db/responses");
		if (existingResponses && existingResponses.length > 0) {
			setResponses([...existingResponses]);
		}
	}

	/**
	 * Takes in and distributes responses from MeetingForm.js to the appropriate places: MongoDB and/or Coach Accountable. See server/routes/db.js
	 * @param {Object} userResponse json body to be posted and displayed to the users
	 */
	async function submitResponses(userResponse) {
		await axios.post("/db/responses", userResponse);
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
		const deleteRes = await axios.delete("/db/responses", responses);
		await alert(`Deleted ${deleteRes.deletedCount} item(s) from the database.`);
		setResponses([]);
	}

	return (
		<div className="App">
			<Header currentUser={currentUser} />

			{currentUser ? (
				<h1 className="welcome">Hello, {currentUser.firstName}!</h1>
			) : (
				<h1 className="welcome">Welcome!</h1>
			)}

			<MeetingForm onSubmit={(userResponse) => submitResponses(userResponse)} />
			<Responses responses={responses} />

			<button className="btn" onClick={() => deleteAllResponses()}>
				Delete All Responses
				<br />
				(Please use after testing)
			</button>
			<Footer />
		</div>
	);
}
