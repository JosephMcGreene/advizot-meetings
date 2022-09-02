import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import MeetingForm from "./components/form/MeetingForm";
import Responses from "./components/Responses";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path="form" element={<MeetingForm />}></Route>
					<Route path="responses" element={<Responses />}></Route>
				</Route>
			</Routes>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);
