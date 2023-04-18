import linkedInLogo from "../../assets/img/linkedin-logo.png";
import googleLogo from "../../assets/img/google-G.png";

export default function Login() {
  return (
    <div className="modal-body">
      <a href="/auth/linkedin" className="signin-btn">
        <button className="linkedin-hover">
          <img src={linkedInLogo} alt="LinkedIn Logo" className="logo"></img>
          <span>Sign in with LinkedIn</span>
        </button>
      </a>

      <a href="/auth/google" className="signin-btn">
        <button className="google-hover">
          <img src={googleLogo} alt="Google Logo" className="logo" />
          <span>Sign in with Google</span>
        </button>
      </a>
    </div>
  );
}
