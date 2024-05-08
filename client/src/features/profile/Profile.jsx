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
  const [profileInfo, signIns, loading] = useProfile(id);
  const fullName = `${profileInfo.firstName} ${profileInfo.lastName}`;

  if (loading) return <LoadingSpinner />;
  return (
    <section className="profile">
      <article className="basic-info" id="basicInfo">
        <img className="profile-photo" src={profileInfo.photo} alt={fullName} />
        <label htmlFor="basicInfo">
          <h1>{fullName}</h1>
          <h3>
            {profileInfo.role === "admin" ? "Chair" : `${profileInfo.group}`}
          </h3>
          <h3>{profileInfo.email}</h3>
        </label>
        {/* <EditPen className="edit-pen" /> */}
      </article>

      <article className="secondary-data">
        <h2>Sign-In History</h2>

        <ul className="sign-in-history">
          {signIns.map((signIn, index) => (
            <SignIn
              date={signIn.date}
              monthlyGoal={signIn.monthlyGoal}
              key={signIn.date + index}
            />
          ))}
          {/* TODO Implement Pagination here? */}
        </ul>
      </article>
    </section>
  );
}
