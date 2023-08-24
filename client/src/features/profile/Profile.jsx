import { Link } from "react-router-dom";

export default function Profile() {
  const style = {
    backgroundColor: "orange",
    maxWidth: "fitContent",
    marginLeft: "30%",
    padding: "0.25rem",
    borderRadius: "12px",
  };

  return (
    <article>
      <h2>
        Oh, sorry for the confusion, but the profile page isn't actually a
        feature yet. Check back soon though!
      </h2>
      <Link to="/meeting" style={style}>
        Back to the Meeting
      </Link>
    </article>
  );
}
