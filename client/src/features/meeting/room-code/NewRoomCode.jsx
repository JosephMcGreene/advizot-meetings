import { useContext } from "react";
import { UserContext } from "../../../App";
// Components
import LoadingSpinner from "../../../shared/LoadingSpinner";
// External
import { Link } from "react-router-dom";
// Hooks
import useRoomCode from "./useRoomCode";

export default function NewRoomCode() {
  const user = useContext(UserContext);
  const [setRoomCode, loading] = useRoomCode();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="modal-body">
      <h3 className="centered-heading">
        Hi {user.firstName}, would you like to create a new room code for this
        meeting?
      </h3>

      <Link to={`/meeting/${user.group}`} tabIndex="-1">
        <button className="btn" onClick={() => setRoomCode(true)}>
          Yes, make a new code
        </button>
      </Link>
      <Link to={`/meeting/${user.group}`} tabIndex="-1">
        <button className="btn" onClick={() => setRoomCode(false)}>
          No, keep the old code
        </button>
      </Link>
    </div>
  );
}
