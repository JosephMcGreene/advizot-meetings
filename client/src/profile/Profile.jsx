// External
import { Link } from "react-router-dom";
// Internal
import SignInsColumn from "./SignInsColumn";
import UserInfoColumn from "./UserInfoColumn";

export default function Profile() {
  return (
    <>
      <Link to="../">
        <button className="btn">Back to Meeting</button>
      </Link>

      <div className="profile">
        <UserInfoColumn />
        <SignInsColumn />
      </div>
    </>
  );
}
