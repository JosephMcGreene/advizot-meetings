import { useContext } from "react";
import { UserContext } from "../../App";
import { Link, Navigate } from "react-router-dom";

export default function Profile() {
  const user = useContext(UserContext);

  const style = {
    backgroundColor: "orange",
    maxWidth: "fitContent",
    marginLeft: "30%",
    padding: "0.25rem",
    borderRadius: "12px",
  };

  if (!user.advizotID) return <Navigate to="/" />;
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
