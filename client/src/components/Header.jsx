import { useState, useContext } from "react";
import { UserContext } from "../App";
import advizotLogo from "../assets/img/original-on-transparent.png";
import Login from "./modals/Login";
import MeetingCode from "./modals/MeetingCode";

export default function Header({ onSubmit }) {
	const [showMeetingCode, setShowMeetingCode] = useState(false);
	const [showLogin, setShowLogin] = useState(false);
	const currentUser = useContext(UserContext);

	return (
		<header className="header">
			<ul className="header-ul">
				<li className="logo-wrapper">
					<img src={advizotLogo} alt="Advizot logo" className="logo" />
				</li>
				<li className="actions-container">
					{/* Show sign out link if logged in, or sign in if logged out */}
					{currentUser ? (
						<>
							{/* <button
									className="btn"
									onClick={() => setShowMeetingCode(!showMeetingCode)}
								>
									Enter Meeting
								</button> */}
							<a href="/auth/logout">
								<button className="btn">Sign out</button>
							</a>
						</>
					) : (
						<button className="btn" onClick={() => setShowLogin(!showLogin)}>
							Sign in
						</button>
					)}
				</li>
			</ul>

			{/* don't always need to see the modals */}
			{showLogin && <Login onClose={() => setShowLogin(!showLogin)} />}
			{showMeetingCode && (
				<MeetingCode
					onClose={() => setShowMeetingCode(!showMeetingCode)}
					onSubmit={onSubmit}
				/>
			)}
		</header>
	);
}
