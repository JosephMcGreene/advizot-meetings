import LinkedInLogo from "../img/LI-In-Bug.png";

export default function Modal({ showLogin, onClose }) {
	if (!showLogin) {
		return null;
	}

	const linkedinLogin = () => {
		window.open("http://localhost:8080/auth/linkedin", "_self");
	};

	return (
		<div className="modal">
			<div className="modal-content">
				<div className="modal-header">
					<span>Login</span>
					<button className="close-x" onClick={() => onClose()}>
						&times;
					</button>
				</div>
				<div className="modal-body">
					<button className="linkedin-btn" onClick={() => linkedinLogin()}>
						<img
							src={LinkedInLogo}
							alt="LinkedIn Logo"
							className="linkedin-logo"
						></img>
						<span>Login with LinkedIn</span>
					</button>
				</div>
			</div>
		</div>
	);
}
