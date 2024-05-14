//Assets
// import { ReactComponent as EditPen } from "../../assets/img/pen-solid.svg";
import { ReactComponent as ChartIcon } from "../../assets/img/chart-line-solid.svg";
//External
import { useParams, useLocation, Link, Outlet } from "react-router-dom";
//Hooks
import useProfile from "../../hooks/useProfile";
//Components
import LoadingSpinner from "../../features/shared/LoadingSpinner";
import SignIn from "./SignIn";

export default function Profile() {
  const { id } = useParams();
  const location = useLocation();
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
        </label>
        {/* <EditPen className="edit-pen" /> */}
      </article>

      <article className="secondary-data">
        <h2>History</h2>
        <Link to={`/profile/${id}/trends`}>
          <ChartIcon className="chart" />
        </Link>

        <Outlet />

        {!location.pathname.includes("/trends") && (
          <ul className="sign-in-history">
            {signIns.map((signIn) => (
              <SignIn signIn={signIn} key={signIn._id} />
            ))}
            {/* TODO Implement Pagination here? */}
          </ul>
        )}
      </article>
    </section>
  );
}
