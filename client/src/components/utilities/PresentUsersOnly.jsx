import { useContext } from "react";
//Internal
import { UserContext } from "../../App";
//Components
import MeetingCode from "../pages/MeetingCode";

export default function PresentUsersOnly({ onSubmitPasscode, children }) {
  const user = useContext(UserContext);

  if (!user.hasMeetingCode) {
    return <MeetingCode onSubmit={onSubmitPasscode} />;
  }
  // child is <Meeting />
  return children;
}
