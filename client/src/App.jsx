import React, { useState, useEffect } from "react";
//External
import axios from "axios";
import { Routes, Route } from "react-router-dom";
//Internal
import "./scss/App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainContent from "./components/pages/MainContent";
import Projection from "./components/pages/Projection";
//Context for logged in user data currentUser:
export const UserContext = React.createContext();

export default function App() {
	const [loading, setLoading] = useState(false);
	const [responses, setResponses] = useState([]);
	const [currentUser, setCurrentUser] = useState({});

	useEffect(() => {
		getCurrentUser();
	}, []);

	useEffect(() => {
		getExistingResponses();
	}, [currentUser]);

	//=====HELPERS=====
	/**
	 * makes request for info on the current user and updates currentUser state accordingly
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
			setLoading(true);

			const existingResponses = await axios({
				method: "get",
				url: "/db/responses",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});

			if (existingResponses.status >= 200 && existingResponses.status < 300) {
				setResponses([...existingResponses.data]);
			}
			setLoading(false);
		} catch (error) {
			console.error(error);
		}
	}

	/**
	 * Takes in user response from MeetingForm.js and adds it to the database or updates an existing user response. See /routes/db.js
	 * @param {Object} responseToSubmit json body to be added to edited in the database and displayed to the users
	 * @returns {Object} response object from the server
	 */
	async function submitResponse(responseToSubmit) {
		responseToSubmit.userName = `${currentUser.firstName} ${currentUser.lastName}`;
		responseToSubmit.date = Date.now();
		try {
			setLoading(true);

			const submitRes = await axios({
				method: "post",
				url: "/db/responses",
				data: responseToSubmit,
			});

			if (submitRes.status >= 200 && submitRes.status < 300) {
				const newResponses = responses.filter(
					(response) => response._id !== responseToSubmit._id
				);
				newResponses.push(submitRes.data);

				setResponses(newResponses);
			}
			setLoading(false);
			return submitRes;
		} catch (error) {
			console.error(error);
		}
	}

	/**
	 * Deletes the specified user response from the list as well as the db
	 * @param {Object} responseToDelete The user response to be deleted from db and UI
	 * @returns {Object} the response from the server
	 */
	async function deleteResponse(responseToDelete) {
		try {
			setLoading(true);
			const deleteRes = await axios({
				method: "delete",
				url: "/db/responses",
				data: responseToDelete,
			});

			if (deleteRes.status >= 200 && deleteRes.status < 300) {
				// Make a new array of all responses EXCEPT the one to be deleted
				setResponses(
					responses.filter((response) => response._id !== responseToDelete._id)
				);
				setLoading(false);
				return deleteRes;
			}
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="App">
			<UserContext.Provider value={currentUser}>
				<Header />
				{/* User must sign in to use app features, so only show the features if logged in: */}
				{currentUser ? (
					<Routes>
						<Route
							path="/"
							element={
								<MainContent
									onSubmit={(responseToSubmit) =>
										submitResponse(responseToSubmit)
									}
									responses={responses}
									loading={loading}
									onSubmitEdits={(userEdit) => submitResponse(userEdit)}
									onDelete={(responseToDelete) =>
										deleteResponse(responseToDelete)
									}
								/>
							}
						/>
						<Route
							path="/projection"
							element={
								<Projection
									responses={responses}
									loading={loading}
									onSubmitEdits={(userEdit) => submitResponse(userEdit)}
									onDelete={(responseToDelete) =>
										deleteResponse(responseToDelete)
									}
								/>
							}
						/>
					</Routes>
				) : (
					<h1 className="welcome">
						Welcome! <br /> Please sign in to continue.
					</h1>
				)}
			</UserContext.Provider>
			<Footer />
		</div>
	);
}
