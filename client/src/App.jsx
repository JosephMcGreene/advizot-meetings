//! Overall Goals:
//!    - Easy and Fast to use
//!    - Secure Server Sign-In
//!    - Answers to sign-in questions to be used during the course of the meeting via a projector
//!    - POST data to Coach Accountable to be stored as a metric for user later on
//TODO (1) Figure out user authentication; email Coach Accountable
//TODO    (- POST data to Coach Accountable. Add ability to remove the data as well.)
//TODO (2) Add a modal for logging users in to the app (^see above^)
//TODO 		- Add the code to the back end for this
//TODO (3) (Add a modal for Kevin to edit the form each month)

//React
import { useState, useEffect } from "react";

//Internal
import Modal from "./components/Modal";
import Header from "./components/no-state/Header";
import MeetingForm from "./components/MeetingForm";
import Responses from "./components/Responses";
import Footer from "./components/no-state/Footer";
import "./scss/App.scss";

export default function App() {
	const [showLogin, setShowLogin] = useState(false);
	const [responses, setResponses] = useState([]);

	//=====EFFECTS=====
	useEffect(() => {
		try {
			getExistingResponses();
		} catch (error) {
			console.error(error);
		}
	}, []);

	//=====HELPERS=====
	/**
	 * fetches existing user responses from MongoDB and updates state accordingly
	 */
	const getExistingResponses = async () => {
		const existingResponses = await fetchData("../../db/responses", "GET");
		setResponses([...responses, ...existingResponses]);
	};

	/**
	 * A shorthand function to avoid typing out verbose code whenever fetch() needs to be used to get json data
	 * @param {String} url 		The url which data is got from, post to, etc.
	 * @param {String} method http method being used: GET, POST, PUT, etc.
	 * @param {Object} body 	Optional: json data to be POSTed, DELETEd, etc.
	 */
	const fetchData = async (url, method, body) => {
		try {
			const response = await fetch(url, {
				method: method,
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});
			const json = await response.json();
			return json;
		} catch (error) {
			console.error(error);
		}
	};

	/**
	 * Takes in and distributes responses from MeetingForm.js to the appropriate places: MongoDB and/or Coach Accountable
	 * @param {Object} userResponse json body to be posted and displayed to the users
	 */
	const submitResponses = async (userResponse) => {
		await setResponses([...responses, userResponse]);
		fetchData("../../db/responses", "POST", userResponse);
	};

	return (
		<div className="App">
			<Header />

			<MeetingForm onSubmit={(userResponse) => submitResponses(userResponse)} />
			<Responses responses={responses} />

			<button onClick={() => setShowLogin(!showLogin)}>Show Login</button>
			<Footer />

			{/* =====MODAL BOX(ES)===== */}
			<Modal
				showLogin={showLogin}
				onClose={() => setShowLogin(!showLogin)}
				onSubmit={(userInfo) => fetchData("../../db/members", "POST", userInfo)}
			/>
		</div>
	);
}
