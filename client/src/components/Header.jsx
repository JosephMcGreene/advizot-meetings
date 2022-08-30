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
				<div className="actions-container">
					<img src={actionBars} alt="actions" className="action-bars" />
					<ul className="nav-list">
						{currentUser ? (
							<a href="/auth/logout">
								<li className="nav-item">Log out</li>
							</a>
						) : (
							<li className="nav-item" onClick={() => setShowLogin(!showLogin)}>
								Log in
							</li>
						)}
						<li className="nav-item">(Settings)</li>
						<li className="nav-item">(1:1 Check In)</li>
					</ul>
				</div>
			</nav>

			<Login showLogin={showLogin} onClose={() => setShowLogin(!showLogin)} />
		</header>
	);
}
