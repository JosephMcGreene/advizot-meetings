// ! Overall Goals:
// !    - Easy and Fast to use
// !    - Secure Server Sign-In
// !    - Answers to sign-in questions to be used during the course of the meeting via a projector
// !    - POST data to Coach Accountable to be stored as a metric for user later on
// TODO (1) Clean up UX:
// TODO 	 - Change the font of the user input on Responses component
// TODO 	 - Format Responses component to display info properly, helpfully, and aesthetically
// TODO 	 - Add some animations(?)
// TODO (2) Add a Back-End or some other way to have data persist
// TODO    - Figure out authentication; email Coach Accountable
// TODO    - POST data to Coach Accountable. Add ability to remove the data as well.
// TODO (3) Add a modal for Kevin to edit the form each month

//React
import { useState } from "react";

//Internal
import Header from "./components/no-state/Header";
import MeetingForm from "./components/MeetingForm";
import Responses from "./components/Responses";
import Footer from "./components/no-state/Footer";
import "./scss/App.scss";

//External
import io from "socket.io-client";
const socket = io.connect("http://localhost:8080");

export default function App() {
	const [responses, setResponses] = useState([]);

	function sendMessage() {
		// socket.emit();
	}

	async function submitResponses(userResponse) {
		setResponses([...responses, userResponse]);

		const serverResponse = await fetch("../../postMetric", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userResponse),
		});
		const json = await serverResponse.json();
	}

	async function deleteMetric() {
		const serverResponse = await fetch("../../deleteMetric");
		const confirm = await serverResponse.json();
	}

	return (
		<div className="App">
			<Header />

			<MeetingForm onSubmit={(userResponse) => submitResponses(userResponse)} />
			<form action="../../deleteMetric"></form>
			<button className="btn" onClick={() => deleteMetric()}>
				Remove Metric
			</button>
			<Responses responses={responses} />

			<Footer />
		</div>
	);
}
