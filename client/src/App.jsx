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

//*>>>BUGS:
//* Kevin logging in with LinkedIn makes him logged in as me

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
	 * @returns {Object} the response from the server
	 */
	async function submitResponse(userResponse) {
		userResponse.userName = `${currentUser.firstName} ${currentUser.lastName}`;
		userResponse.date = Date.now();
		try {
			const submitResponse = await axios({
				method: "post",
				url: "/db/responses",
				data: userResponse,
			});

			if (submitResponse.status >= 200 && submitResponse < 300) {
				setResponses([...responses, userResponse]);
				return submitResponse;
			}
		} catch (error) {
			console.error(error);
		}
	}

	/**
	 * Deletes the specified user response from the list as well as the db
	 * @param {Object} userResponse The user response to be deleted from db and UI
	 * @returns {Object} the response from the server
	 */
	async function deleteResponse(userResponse) {
		try {
			const deleteResponse = await axios({
				method: "delete",
				url: "/db/responses",
				data: userResponse,
			});

			if (deleteResponse.status >= 200 && deleteResponse.status < 300) {
				// Make a new array of all responses EXCEPT the one to be deleted
				setResponses(
					responses.filter((response) => response._id !== userResponse._id)
				);
				return deleteResponse;
			}
		} catch (error) {
			console.error(error);
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
							onSubmit={(userResponse) => submitResponse(userResponse)}
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
