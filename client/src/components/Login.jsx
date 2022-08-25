import LinkedInLogo from "../img/LI-In-Bug.png";
import GoogleLogo from "../img/Search_GSA.max-2800x2800.png";

export default function Login({ showLogin, onClose }) {
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
							<span>Sign in with LinkedIn</span>
						</button>
					</a>

					<a href="/auth/google">
						<button className="google-btn">
							<img
								src={GoogleLogo}
								alt="Google Logo"
								className="google-logo"
							></img>
							<span>Sign in with Google</span>
						</button>
					</a>

					<a href="/auth/logout">
						<button className="btn">Log out</button>
					</a>
				</div>
			</div>
		</div>
	);
}
