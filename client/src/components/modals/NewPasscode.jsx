import { useState, useContext } from "react";
import { axiosFetch } from "../../helpers";
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
      const passcodeResponse = await axiosFetch("get", "/passcode/passcode");
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
      <h4>
        Hi {user.firstName}, would you like to create a new passcode for this
        meeting?
      </h4>
      <button className="btn" onClick={() => generatePasscode()}>
        Yes, make a new code
      </button>
      <button className="btn">No, keep the old code</button>
    </div>
  );
}
