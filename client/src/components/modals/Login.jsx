import LinkedInLogo from "../../assets/img/LI-In-Bug.png";
import GoogleLogo from "../../assets/img/Search_GSA.max-2800x2800.png";

export default function Login() {
  return (
    <div className="modal-body">
      <a href="/auth/linkedin" className="signin-btn">
        <button className="linkedin-hover">
          <img src={LinkedInLogo} alt="LinkedIn Logo" className="logo"></img>
          <span>Sign in with LinkedIn</span>
        </button>
      </a>

      <a href="/auth/google" className="signin-btn">
        <button className="google-hover">
          <img src={GoogleLogo} alt="Google Logo" className="logo" />
          <span>Sign in with Google</span>
        </button>
      </a>
    </div>
  );
}
