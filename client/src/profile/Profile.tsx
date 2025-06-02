// Components
import ProfileSignIns from "../meeting/sign-ins/SignInList"; // Rename SignInList
import LoadingSpinner from "../shared/LoadingSpinner";
import UserInfo from "./UserInfo";
// Hooks
import useProfile from "../hooks/useProfile";

export default function Profile() {
  const [checkInHistory, loading] = useProfile();

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
