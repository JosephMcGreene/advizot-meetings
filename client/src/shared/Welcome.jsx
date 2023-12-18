import { useState } from "react";
//Components
import ModalTemplate from "./modals/ModalTemplate";
import Login from "./modals/Login";

export default function Welcome() {
  const [loginShown, setLoginShown] = useState(false);

  return (
    <section>
      <h1 className="welcome">
        Welcome! <br /> Please log in to continue.
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
