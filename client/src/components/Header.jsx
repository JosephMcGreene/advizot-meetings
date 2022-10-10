import { useState, useContext } from "react";
//External
import { Link } from "react-router-dom";
//Internal
import advizotLogo from "../assets/img/original-on-transparent.png";
import Login from "./modals/Login";
import MeetingCode from "./modals/MeetingCode";
import projectorScreen from "../assets/img/display-solid.svg";
import { UserContext } from "../App";

export default function Header({ onSubmit }) {
	const [showMeetingCode, setShowMeetingCode] = useState(false);
	const [showLogin, setShowLogin] = useState(false);
	const currentUser = useContext(UserContext);

	return (
		<header className="header">
			<nav className="nav-bar">
				<div className="logo-wrapper">
					<img src={advizotLogo} alt="Advizot logo" className="logo" />
				</div>
				<ul className="actions-ul">
					{/* Show sign out link if logged in, or sign in if logged out */}
					{currentUser ? (
						<li className="nav-item">
							<a href="/auth/logout">
								<button className="btn">Sign out</button>
							</a>
						</li>
					) : (
						<li className="nav-item">
							<button className="btn" onClick={() => setShowLogin(!showLogin)}>
								Sign in
							</button>
						</li>
					)}
					<li className="nav-item">
						<button className="btn">
							<s>
								[1:1 <br /> Check-in]
							</s>
						</button>
					</li>
					<li className="nav-item">
						<button className="btn">
							<s>[Settings]</s>
						</button>
					</li>
				</ul>
			</nav>

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
