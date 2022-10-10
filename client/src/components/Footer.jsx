// import { useContext } from "react";
// import { UserContext } from "../App";
//Assets
import logoBlack from "../assets/img/black-on-transparent.png";

export default function Footer() {
	// const currentUser = useContext(UserContext);

	return (
		<footer className="footer">
			{/* {currentUser ? <a href="/auth/logout">Sign Out</a> :  */}
			<span className="copyright">&copy; 2022</span>
			<a href="https://www.advizot.com" rel="noreferrer" target="_blank">
				<img src={logoBlack} alt="Advizot logo" className="footer-logo" />
			</a>
		</footer>
	);
}
