// Components
import ProfileSignIns from "../meeting/sign-ins/SignInList"; // Rename SignInList
import LoadingSpinner from "../shared/LoadingSpinner";
import UserInfo from "./UserInfo";
// Hooks
import useProfile from "../hooks/useProfile";

export default function Profile() {
  const [loading, signInHistory, userInfo] = useProfile();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="profile">
      <UserInfo userInfo={userInfo} />

      <ProfileSignIns
        deleteSignIn={() => console.log("Deleted!")}
        signIns={signInHistory}
        submitSignIn={() => console.log("Submitted!")}
      />
    </div>
  );
}
