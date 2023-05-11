import { useContext } from "react";
import { UserContext } from "../../App";
//External
import { Navigate } from "react-router-dom";
//Components
import NewPasscode from "../pages/NewPasscode";
import PasscodePrompt from "./PasscodePrompt";

export default function UsersOnly({ onSubmitPasscode }) {
  const user = useContext(UserContext);

  if (!user) return <Navigate to="/" />;

  if (user.role === "admin") return <NewPasscode />;

  return (
    <PasscodePrompt onSubmitPasscode={onSubmitPasscode}>
      <Navigate to="/meeting" />
    </PasscodePrompt>
  );
}
