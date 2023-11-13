import linkedInLogo from "../../assets/img/linkedin-logo.png";
import googleLogo from "../../assets/img/google-G.png";

export default function Login() {
  return (
    <div className="modal-body">
      <a
        href="/auth/linkedin"
        className="login-btn linkedin-hover"
        name="linkedin-button"
      >
        <img src={linkedInLogo} alt="LinkedIn Logo" className="logo"></img>
        <label htmlFor="linkedin-button">Log in with LinkedIn</label>
      </a>

      <a
        href="/auth/google"
        className="login-btn google-hover"
        name="google-button"
      >
        <img src={googleLogo} alt="Google Logo" className="logo" />
        <label htmlFor="google-button">Log in with Google</label>
      </a>
    </div>
  );
}
