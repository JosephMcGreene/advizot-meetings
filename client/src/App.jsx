//! Overall Goals:
//!    - Easy and Fast to use
//!    - Secure Server Sign-In
//!    - Answers to sign-in questions to be used during the course of the meeting via a projector
//!    (- POST data to Coach Accountable to be stored as a metric for user later on)
//TODO (1) Add user...
//TODO			- settings
//TODO			- ability to delete/change their own responses
//TODO (2) Create session rooms for each of the three groups
//TODO (- POST data to Coach Accountable. Add ability to remove the data as well.)

//? What is the best way to authorize users as group members?

import { useState, useEffect } from "react";
//External
import axios from "axios";
//Internal
import "./scss/App.scss";
import Header from "./components/Header";
import MeetingForm from "./components/form/MeetingForm";
import Responses from "./components/responses/Responses";
import Footer from "./components/Footer";

export default function App() {
	const [responses, setResponses] = useState([]);
	const [currentUser, setCurrentUser] = useState({});

	//=====EFFECTS=====
	useEffect(() => {
		getCurrentUser();
	}, []);

	useEffect(() => {
		getExistingResponses();
	}, []);

	//=====HELPERS=====
	/**
	 * makes request for info on the current user
	 */
	async function getCurrentUser() {
		try {
			const current_user = await axios("/auth/current_user", {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});
			setCurrentUser(current_user.data);
		} catch (error) {
			console.error(error);
		}
	}

	/**
	 * fetches existing user responses from MongoDB and updates state accordingly. See server/routes/db.js
	 */
	async function getExistingResponses() {
		try {
			const existingResponses = await axios({
				method: "get",
				url: "/db/responses",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});
			if (existingResponses.data && existingResponses.data.length > 0) {
				setResponses([...existingResponses.data]);
			}
		} catch (error) {
			console.error(error);
		}
	}

	/**
	 * Takes in response from MeetingForm.js adds it to the database. See /routes/db.js
	 * @param {Object} userResponse json body to be added to the database and displayed to the users
	 */
	async function submitResponses(userResponse) {
		userResponse.userName = `${currentUser.firstName} ${currentUser.lastName}`;
		userResponse.date = Date.now();
		await axios({ method: "post", url: "/db/responses", data: userResponse });
		setResponses([...responses, userResponse]);
	}

	// DELETES EVERY SINGLE USER RESPONSE ENTRY IN DATABASE
	/**
	 * Deletes the current slate of documents from MongoDB. See /routes/db.js
	 */
	// async function deleteAllResponses() {
	// 	if (responses.length === 0) {
	// 		return;
	// 	}
	// 	await axios({
	// 		method: "delete",
	// 		url: "/db/responses",
	// 		data: responses,
	// 	});
	// 	await alert(`Deleted all items from the database.`);
	// 	setResponses([]);
	// }

	async function deleteResponse(userResponse) {
		console.log(userResponse);
		const deleteResponse = await axios({
			method: "delete",
			url: "/db/responses",
			data: userResponse,
		});

		if (deleteResponse.status === 200) {
			setResponses(
				responses.filter((response) => response._id !== userResponse._id)
			);
		}
	}

	return (
		<div className="App">
			<Header currentUser={currentUser} />
			<main className="main-content">
				{/* User must sign in to use app features, so only show the features if logged in: */}
				{currentUser ? (
					<>
						<h1 className="welcome">Hello, {currentUser.firstName}!</h1>

						<MeetingForm
							onSubmit={(userResponse) => submitResponses(userResponse)}
							currentUser={currentUser}
						/>

						<Responses
							currentUser={currentUser}
							responses={responses}
							onDelete={(userResponse) => deleteResponse(userResponse)}
						/>
					</>
				) : (
					<h1 className="welcome">
						Welcome! <br /> Please sign in to continue.
					</h1>
				)}
			</main>
			<Footer />
		</div>
	);
}
