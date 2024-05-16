//External
import { useParams, Outlet } from "react-router-dom";
//Hooks
import useProfile from "../../hooks/useProfile";
//Components
import LoadingSpinner from "../../features/shared/LoadingSpinner";

export default function Profile() {
  const { id } = useParams();
  const [profileInfo, signIns, loading] = useProfile(id);
  const fullName = `${profileInfo.firstName} ${profileInfo.lastName}`;

  if (loading) return <LoadingSpinner />;
  return (
    <main className="profile">
      <section className="basic-info" id="basicInfo">
        <img className="profile-photo" src={profileInfo.photo} alt={fullName} />
        <label htmlFor="basicInfo">
          <h1>{fullName}</h1>
          <h3>
            {profileInfo.role === "admin" ? "Chair" : `${profileInfo.group}`}
          </h3>
        </label>
      </section>

      <Outlet context={[signIns, id]} />
    </main>
  );
}
