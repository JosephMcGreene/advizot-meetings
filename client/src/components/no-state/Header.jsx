import logoIcon from "../../img/big-a.png";

export default function Header() {
	return (
		<header className="header">
			<img src={logoIcon} alt="Advizot 'A'" className="logo" />
			<h1 className="h1">Welcome!</h1>
		</header>
	);
}
