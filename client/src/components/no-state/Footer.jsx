import logoBlack from "../../img/black-on-transparent.png";

export default function Footer() {
	return (
		<footer className="footer">
			<span className="copyright">
				&copy; 2022
				<img src={logoBlack} alt="Advizot logo" className="full-logo" />
			</span>
		</footer>
	);
}
