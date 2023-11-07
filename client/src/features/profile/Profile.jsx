import { useState, useContext } from "react";
//Internal
import { UserContext } from "../../App";
//External
import { Link } from "react-router-dom";

export default function Profile() {
  const user = useContext(UserContext);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState("");

  const style = {
    backgroundColor: "orange",
    maxWidth: "fitContent",
    marginLeft: "30%",
    padding: "0.25rem",
    borderRadius: "12px",
  };

  return (
    <section>
      <article>
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        <img src={user.photo} alt={`${user.firstName} ${user.lastName}`} />
        <h3>{user.group}</h3>
      </article>

      <article>
        <h2>Contact Information</h2>
        <form>
          <label htmlFor="email">
            <input type="email" name="email" id="email" value={email} />
          </label>
          <label htmlFor="phone">
            <input type="tel" name="phone" id="phone" value={phone} />
          </label>
        </form>
      </article>

      <h2>
        Oh, sorry for the confusion, but the profile page isn't actually a
        feature yet. Check back soon though!
      </h2>
      <Link to="/meeting" style={style}>
        Back to the Meeting
      </Link>
    </section>
  );
}
