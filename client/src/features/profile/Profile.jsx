import { useContext } from "react";
import { UserContext } from "../../App";
//Assets
import { ReactComponent as EditPen } from "../../../../assets/img/pen-solid.svg";

export default function Profile() {
  const user = useContext(UserContext);

  return (
    <section className="profile">
      <article className="basic-info">
        <img
          className="profile-photo"
          src={user.photo}
          alt={`${user.firstName} ${user.lastName}`}
        />
        <h1>
          {user.firstName} {user.lastName}
        </h1>

        <h3>{user.role === "admin" ? "Chair" : `Member, ${user.group}`}</h3>
        <h3>{user.email}</h3>
        <EditPen className="edit-pen" />
      </article>

      <article className="profile-sign-ins">
        <h2>Sign-In History</h2>
        <ul className="sign-in-history">
          {
            // TODO Add a query for member's sign-in history
          }
          {
            // TODO Implement Pagination here?
          }
        </ul>
      </article>
    </section>
  );
}
