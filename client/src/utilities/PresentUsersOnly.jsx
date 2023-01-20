import { useContext } from "react";
import { UserContext } from "../App";
//Internal
import MeetingCode from "../components/pages/MeetingCode";

export default function PresentUsersOnly({ onSubmit, children }) {
  const currentUser = useContext(UserContext);

  if (!currentUser.hasMeetingCode) {
    return <MeetingCode onSubmit={onSubmit} />;
  }

  // child is <MeetingContent />
  return children;
}
