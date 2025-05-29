import { useState, useContext } from "react";
import { UserContext } from "../App";
// Components
import Login from "./modals/Login";
import ModalTemplate from "./modals/ModalTemplate";
// External
import { Navigate } from "react-router-dom";
import { User } from "../types/user";

export default function Welcome() {
  const user: User = useContext(UserContext);
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
        <ModalTemplate handleClose={() => setLoginShown(false)} title="Log In">
          <Login />
        </ModalTemplate>
      )}
    </section>
  );
}
