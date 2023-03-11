import { useContext } from "react";
//Internal
import { UserContext } from "../../App";
//Components
import MeetingCode from "../pages/MeetingCode";

export default function PresentUsersOnly({ onSubmitPasscode, children }) {
  const currentUser = useContext(UserContext);

  if (!currentUser.hasMeetingCode) {
    return <MeetingCode onSubmit={onSubmitPasscode} />;
  }

  // child is <Meeting />
  return children;
}
