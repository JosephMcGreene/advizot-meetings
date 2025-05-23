import linkedInLogo from "../../assets/img/linkedin-logo.png";
import googleLogo from "../../assets/img/google-G.png";

export default function Login() {
  return (
    <>
      <a
        href="/auth/linkedin"
        className="login-btn linkedin-hover"
        name="linkedin-button"
      >
        <img src={linkedInLogo} alt="LinkedIn Logo" className="logo"></img>
        <p htmlFor="linkedin-button">Log in with LinkedIn</p>
      </a>

      <a
        href="/auth/google"
        className="login-btn google-hover"
        name="google-button"
      >
        <img src={googleLogo} alt="Google Logo" className="logo" />
        <p htmlFor="google-button">Log in with Google</p>
      </a>
    </>
  );
}
