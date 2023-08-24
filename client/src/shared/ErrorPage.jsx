import { Link } from "react-router-dom";

export default function ErrorPage({ error }) {
  return (
    <article>
      <h1 className="centered-heading">Sorry, but there's been an error:</h1>

      <p className="error-text">{error.message}</p>

      <nav>
        <Link to="/meeting">
          <button className="btn">Go to the Meeting</button>
        </Link>
        <Link to="/profile">
          <button className="btn">Go to your Profile</button>
        </Link>
      </nav>
    </article>
  );
}
