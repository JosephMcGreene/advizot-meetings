import { useContext } from "react";
//Context
import { UserContext } from "../../App";
//Components
import MeetingCode from "../pages/MeetingCode";

export default function PresentMembersOnly({ onSubmitPasscode, children }) {
  const user = useContext(UserContext);

  if (!user.hasMeetingCode) {
    return <MeetingCode onSubmit={onSubmitPasscode} />;
  }
  // child is <Meeting />
  return children;
}
