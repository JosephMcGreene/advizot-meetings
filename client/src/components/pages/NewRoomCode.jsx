import { useState, useContext } from "react";
import { UserContext } from "../../App";
//External
import { Link } from "react-router-dom";
//Helpers
import { axiosFetch } from "../../helpers";
//Components
import LoadingSpinner from "../utilities/LoadingSpinner";

export default function NewRoomCode() {
  const [loading, setLoading] = useState(false);
  const user = useContext(UserContext);

  async function setRoomCode(needNewCode) {
    try {
      setLoading(true);

      const roomCodeResponse = await axiosFetch(
        "post",
        "/roomCode/setRoomCode",
        { needNewCode }
      );

      localStorage.setItem(
        "roomCode",
        roomCodeResponse.data.roomCodeDB.currentRoomCode.toString()
      );
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="modal-body">
      <h3 className="centered-heading">
        Hi {user.firstName}, would you like to create a new room code for this
        meeting?
      </h3>
      <button className="btn" onClick={() => setRoomCode(true)}>
        <Link to="/meeting">Yes, make a new code</Link>
      </button>
      <button className="btn" onClick={() => setRoomCode(false)}>
        <Link to="/meeting">No, keep the old code</Link>
      </button>
    </div>
  );
}
