import { useState } from "react";
import logoIcon from "../img/Original on Transparent.png";
// import logoIcon from "../img/black-on-transparent.png";
import actionBars from "../img/bars-solid.svg";
import Login from "./Login";

export default function Header({ currentUser }) {
	const [showLogin, setShowLogin] = useState(false);

	return (
		<header className="header">
			<nav className="nav-bar">
				<img src={logoIcon} alt="Advizot 'A'" className="logo" />
				{currentUser ? (
					<a href="/auth/logout">
						<button className="btn">Sign out</button>
					</a>
				) : (
					<button className="btn" onClick={() => setShowLogin(!showLogin)}>
						Sign in
					</button>
				)}
			</nav>

			<Login showLogin={showLogin} onClose={() => setShowLogin(!showLogin)} />
		</header>
	);
}
