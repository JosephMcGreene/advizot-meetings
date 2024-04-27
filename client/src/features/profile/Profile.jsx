//Assets
import { ReactComponent as EditPen } from "../../../../assets/img/pen-solid.svg";
//External
import { useParams } from "react-router-dom";
//Internal
import { axiosFetch } from "../../helpers";

export default function Profile() {
  const { id } = useParams();

  //TODO Add a function for fetching specific user info using the param id
  const { data } = axiosFetch("post", "/profile", { id });

  return (
    <section className="profile">
      <article className="basic-info">
        <img
          className="profile-photo"
          src={data.photo}
          alt={`${data.firstName} ${data.lastName}`}
        />
        <h1>
          {data.firstName} {data.lastName}
        </h1>

        <h3>{data.role === "admin" ? "Chair" : `Member, ${data.group}`}</h3>
        <h3>{data.email}</h3>
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
