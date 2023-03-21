import { useContext } from "react";
import { axiosFetch } from "../../helpers";
//Context
import { UserContext } from "../../App";

export default function NewPasscode() {
  const user = useContext(UserContext);

  async function generatePasscode() {
    try {
      const passcodeResponse = await axiosFetch("get", "/auth/code");
      console.log(passcodeResponse.data);
      localStorage.setItem(
        "passcode",
        passcodeResponse.data.passcode.toString()
      );
    } catch (err) {
      throw err;
    }
  }

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
