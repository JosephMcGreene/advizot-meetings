import logoBlack from "../assets/img/black-on-transparent.png";

export default function Footer() {
	return (
		<footer className="footer">
			<span className="copyright">&copy; 2022</span>
			<a href="https://www.advizot.com" rel="noreferrer" target="_blank">
				<img src={logoBlack} alt="Advizot logo" className="footer-logo" />
			</a>
		</footer>
	);
}
