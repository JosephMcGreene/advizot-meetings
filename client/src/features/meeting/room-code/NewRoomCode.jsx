import { useContext } from "react";
import { ThemeContext, UserContext } from "../../../App";
//External
import { Link } from "react-router-dom";
//Hooks
import useRoomCode from "../../../hooks/useRoomCode";
//Components
import LoadingSpinner from "../../../shared/LoadingSpinner";

export default function NewRoomCode() {
  const isDark = useContext(ThemeContext);
  const user = useContext(UserContext);
  const [setRoomCode, loading] = useRoomCode();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="modal-body">
      <h3 className="centered-heading">
        Hi {user.firstName}, would you like to create a new room code for this
        meeting?
      </h3>

      <button
        className={isDark ? "btn dark" : "btn"}
        onClick={() => setRoomCode(true)}
      >
        <Link to={`/meeting/${user.group}`} tabIndex="-1">
          Yes, make a new code
        </Link>
      </button>
      <button
        className={isDark ? "btn dark" : "btn"}
        onClick={() => setRoomCode(false)}
      >
        <Link to={`/meeting/${user.group}`} tabIndex="-1">
          No, keep the old code
        </Link>
      </button>
    </div>
  );
}
