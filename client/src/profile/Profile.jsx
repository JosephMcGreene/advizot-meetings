// Components
import ProfileSignIns from "../meeting/sign-ins/SignInList"; // Rename SignInList
import LoadingSpinner from "../shared/LoadingSpinner";
import UserInfo from "./UserInfo";
// External
import { useLocation } from "react-router-dom";
// Hooks
import useProfile from "../hooks/useProfile";

export default function Profile() {
  const [checkInHistory, loading] = useProfile();
  const location = useLocation();
  // * See TODO below
  const profileID = location.pathname.split("/")[2];

  // TODO
  // TODO Fetch the info for the person whose profile it is! Not the current user's!
  // TODO
  // TODO async function fetchProfile(idToFetch) {}

  if (loading) return <LoadingSpinner />;

  return (
    <div className="profile">
      <UserInfo />

      <ProfileSignIns
        deleteSignIn={() => console.log("Deleted!")}
        signIns={checkInHistory}
        submitSignIn={() => console.log("Submitted!")}
      />
    </div>
  );
}
