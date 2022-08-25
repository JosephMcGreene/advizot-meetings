import { useState } from "react";
// import logoIcon from "../img/Original on Transparent.png";
import logoIcon from "../img/black-on-transparent.png";
import Login from "./Login";

export default function Header() {
	const [showLogin, setShowLogin] = useState(false);

	return (
		<header className="header">
			<img src={logoIcon} alt="Advizot 'A'" className="logo" />
			<button className="btn" onClick={() => setShowLogin(!showLogin)}>
				Sign-in
			</button>

			<Login showLogin={showLogin} onClose={() => setShowLogin(!showLogin)} />
		</header>
	);
}
