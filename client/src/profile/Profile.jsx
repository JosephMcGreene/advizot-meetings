// External
import { Link } from "react-router-dom";
// Hooks
import useProfile from "../hooks/useProfile";
// Internal
import CheckInList from "../meeting/sign-ins/SignInList"; // Rename SignInList
import LoadingSpinner from "../shared/LoadingSpinner";
import UserInfo from "./UserInfo";

export default function Profile() {
  const [checkInHistory, loading] = useProfile();

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Link to="../">
        <button className="btn">Back to Meeting</button>
      </Link>

      <div className="profile">
        <UserInfo />

        <div className="check-in-col">
          <CheckInList
            deleteSignIn={() => console.log("Deleted!")}
            signIns={checkInHistory}
            submitSignIn={() => console.log("Submitted!")}
          />
        </div>
      </div>
    </>
  );
}
