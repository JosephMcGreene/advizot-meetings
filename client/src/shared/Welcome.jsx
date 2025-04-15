import { useState, useContext } from "react";
import { UserContext } from "../App";
// Components
import ModalTemplate from "./modals/ModalTemplate";
import Login from "./modals/Login";
// External
import { Navigate } from "react-router-dom";

export default function Welcome() {
  const user = useContext(UserContext);
  const [loginShown, setLoginShown] = useState(false);

  if (user.advizotID) return <Navigate to={`/meeting/${user.group}`} />;

  return (
    <section>
      <h1 className="welcome">
        Welcome!
        <br />
        Please log in to continue.
      </h1>

      <button className="btn" onClick={() => setLoginShown(!loginShown)}>
        Log in
      </button>

      {loginShown && (
        <ModalTemplate title="Log In" handleClose={() => setLoginShown(false)}>
          <Login />
        </ModalTemplate>
      )}
    </section>
  );
}
