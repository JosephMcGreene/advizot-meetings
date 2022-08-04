//! Overall Goals:
//!    - Easy and Fast to use
//!    - Secure Server Sign-In
//!    - Answers to sign-in questions to be used during the course of the meeting via a projector
//!    - POST data to Coach Accountable to be stored as a metric for user later on
//TODO (1) Add a Back-End or some other way to have data persist
//?       - Figure out user authentication; email Coach Accountable
//TODO    - POST data to Coach Accountable. Add ability to remove the data as well.
//TODO (2) Add a modal for logging users in to the app (^see above^)
//TODO (3) Add a modal for Kevin to edit the form each month

//React
import { useState } from "react";

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

	async function fetch(url, method, body) {
		const response = await fetch(url, {
			method: method,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
		const json = await response.json();
		return json;
	}

	async function submitResponses(userResponse) {
		setResponses([...responses, userResponse]);

		// fetch("../../newMetric", "POST", userResponse);
	}

	return (
		<div className="App">
			<Modal
				showLogin={showLogin}
				onClose={() => setShowLogin(!showLogin)}
				onSubmit={(loginInfo) => console.log(loginInfo)}
			/>
			<Header />

			<MeetingForm onSubmit={(userResponse) => submitResponses(userResponse)} />
			<Responses responses={responses} />

			<button onClick={() => setShowLogin(!showLogin)}>Show Login</button>
			<Footer />
		</div>
	);
}
