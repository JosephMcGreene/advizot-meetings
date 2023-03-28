import { useContext } from "react";
//External
import { Navigate } from "react-router-dom";
//Context
import { UserContext } from "../../App";
//Components
import NewPasscode from "../pages/NewPasscode";
import PresentMembersOnly from "./PresentMembersOnly";
import Meeting from "../pages/Meeting";

export default function UsersOnly({ onSubmitPasscode }) {
  const user = useContext(UserContext);

  if (!user) return <Navigate to="/" />;

  if (user.role === "admin") {
    return <NewPasscode />;
  }

  return (
    <PresentMembersOnly onSubmitPasscode={onSubmitPasscode}>
      <Meeting />
    </PresentMembersOnly>
  );
}
