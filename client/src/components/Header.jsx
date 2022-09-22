import { useState, useContext } from "react";
import { UserContext } from "../App";
import advizotLogo from "../img/Original on Transparent.png";
import Login from "./modals/Login";

export default function Header() {
	const [showLogin, setShowLogin] = useState(false);
	const currentUser = useContext(UserContext);

	return (
		<header className="header">
			<nav className="nav-bar">
				<img src={advizotLogo} alt="Advizot logo" className="logo" />
				<div className="actions-container">
					{/* Show sign out link if logged in, or sign in if logged out */}
					{currentUser ? (
						<a href="/auth/logout">
							<button className="btn">Sign out</button>
						</a>
					) : (
						<button className="btn" onClick={() => setShowLogin(!showLogin)}>
							Sign in
						</button>
					)}
				</div>
			</nav>

			<Login showLogin={showLogin} onClose={() => setShowLogin(!showLogin)} />
		</header>
	);
}
