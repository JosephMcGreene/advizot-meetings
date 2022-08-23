import LinkedInLogo from "../img/LI-In-Bug.png";

export default function Modal({ showLogin, onClose }) {
	if (!showLogin) {
		return null;
	}

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
					<a href="/auth/linkedin">
						<button className="linkedin-btn">
							<img
								src={LinkedInLogo}
								alt="LinkedIn Logo"
								className="linkedin-logo"
							></img>
							<span>Login with LinkedIn</span>
						</button>
					</a>
				</div>
			</div>
		</div>
	);
}
