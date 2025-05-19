// External
import { Link } from "react-router-dom";
// Internal
import CheckInsColumn from "./CheckInsColumn";
import UserInfoColumn from "./UserInfoColumn";

export default function Profile() {
  return (
    <>
      <Link to="../">
        <button className="btn">Back to Meeting</button>
      </Link>

      <div className="profile">
        <UserInfoColumn />
        <CheckInsColumn />
      </div>
    </>
  );
}
