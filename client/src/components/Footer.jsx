import logoBlack from "../img/black-on-transparent.png";

export default function Footer() {
	return (
		<footer className="footer">
			<span className="copyright">&copy; 2022</span>
			<a href="https://www.advizot.com">
				<img src={logoBlack} alt="Advizot logo" className="full-logo" />
			</a>
		</footer>
	);
}
