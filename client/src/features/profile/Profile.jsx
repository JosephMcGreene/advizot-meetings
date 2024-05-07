//Assets
import { ReactComponent as EditPen } from "../../assets/img/pen-solid.svg";
//External
import { useParams } from "react-router-dom";
//Hooks
import useProfile from "../../hooks/useProfile";
//Components
import LoadingSpinner from "../../shared/LoadingSpinner";
import SignIn from "./SignIn";

export default function Profile() {
  const { id } = useParams();
  const [personalInfo, signIns, loading] = useProfile(id);

  if (loading) return <LoadingSpinner />;
  return (
    <section className="profile">
      <article className="basic-info" id="basicInfo">
        <img
          className="profile-photo"
          src={personalInfo.photo}
          alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
        />
        <label htmlFor="basicInfo">
          <h1>
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <h3>
            {personalInfo.role === "admin" ? "Chair" : `${personalInfo.group}`}
          </h3>
          <h3>{personalInfo.email}</h3>
        </label>
        {/* <EditPen className="edit-pen" /> */}
      </article>

      <article className="profile-sign-ins">
        <h2>Sign-In History</h2>

        <ul className="sign-in-history">
          {signIns.map((signIn, index) => (
            <SignIn signIn={signIn} key={signIn.date + index} />
          ))}
          {/* TODO Implement Pagination here? */}
        </ul>
      </article>
    </section>
  );
}
