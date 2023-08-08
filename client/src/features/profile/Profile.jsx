import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <article>
      <h2>
        Sorry for the confusion, but the profile page isn't actually a feature
        yet. Check back soon though!
      </h2>
      <Link
        to="/meeting"
        style={{
          backgroundColor: "orange",
          maxWidth: "fitContent",
          marginLeft: "45%",
        }}
      >
        Back to the Meeting
      </Link>
    </article>
  );
}
