import { useState } from "react";
import logo from "../img/Original on Transparent.png";
import Login from "./Login";

export default function Header({ currentUser }) {
	const [showLogin, setShowLogin] = useState(false);

	return (
		<header className="header">
			<nav className="nav-bar">
				<img src={logo} alt="Advizot logo" className="logo" />
				<div className="actions-container">
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
