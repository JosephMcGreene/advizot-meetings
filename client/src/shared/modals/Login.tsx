import googleLogo from "../../assets/img/google-G.png";
import linkedInLogo from "../../assets/img/linkedin-logo.png";

export default function Login() {
  return (
    <>
      <a
        className="login-btn linkedin-hover"
        href="/auth/linkedin"
        name="linkedin-button"
      >
        <img src={linkedInLogo} alt="LinkedIn Logo" className="logo"></img>
        <p htmlFor="linkedin-button">Log in with LinkedIn</p>
      </a>

      <a
        className="login-btn google-hover"
        href="/auth/google"
        name="google-button"
      >
        <img src={googleLogo} alt="Google Logo" className="logo" />
        <p htmlFor="google-button">Log in with Google</p>
      </a>
    </>
  );
}
