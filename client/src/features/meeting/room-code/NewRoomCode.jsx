import { useState, useContext } from "react";
import { UserContext } from "../../../App";
//External
import { Link } from "react-router-dom";
//Helpers
import { axiosFetch } from "../../../helpers";
//Components
import LoadingSpinner from "../../../shared/LoadingSpinner";

export default function NewRoomCode() {
  const [loading, setLoading] = useState(false);
  const user = useContext(UserContext);

  async function makeRoomCode() {
    try {
      setLoading(true);
      const roomCodeResponse = await axiosFetch("get", "/roomCode/newRoomCode");
      console.log(roomCodeResponse);
      localStorage.setItem(
        "roomCode",
        roomCodeResponse.data.correctCode.currentRoomCode.toString()
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
      <button className="btn" onClick={() => makeRoomCode()}>
        <Link to="/meeting">Yes, make a new code</Link>
      </button>
      <button className="btn">
        <Link to="/meeting">No, keep the old code</Link>
      </button>
    </div>
  );
}
