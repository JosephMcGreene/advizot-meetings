import { useState, useContext } from "react";
import { axiosFetch } from "../../helpers";
//External
import { Link } from "react-router-dom";
//Context
import { UserContext } from "../../App";
//components
import LoadingSpinner from "../utilities/LoadingSpinner";

export default function NewPasscode() {
  const [loading, setLoading] = useState(false);
  const user = useContext(UserContext);

  async function generatePasscode() {
    try {
      setLoading(true);
      const passcodeResponse = await axiosFetch("get", "/passcode/newPasscode");
      console.log(passcodeResponse);
      localStorage.setItem(
        "passcode",
        passcodeResponse.data.correctCode.currentPasscode.toString()
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
        Hi {user.firstName}, would you like to create a new passcode for this
        meeting?
      </h3>
      <button className="btn" onClick={() => generatePasscode()}>
        <Link to="/meeting">Yes, make a new code</Link>
      </button>
      <button className="btn">
        <Link to="/meeting">No, keep the old code</Link>
      </button>
    </div>
  );
}
