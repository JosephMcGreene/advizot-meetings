import { useState, useContext } from "react";
//Context
import { UserContext } from "../../App";
//Components
import ModalTemplate from "../modals/ModalTemplate";
import NewPasscode from "../modals/NewPasscode";
import MeetingCode from "../pages/MeetingCode";

export default function PresentMembersOnly({ onSubmitPasscode, children }) {
  const user = useContext(UserContext);
  const [showNewPasscode, setShowNewPasscode] = useState(false);

  if (user.role === "admin") {
    setShowNewPasscode(true);
  }
  // showNewPasscode && (
  //   <ModalTemplate
  //     title="New Passcode"
  //     onClose={() => setShowNewPasscode(false)}
  //   >
  //     <NewPasscode />
  //   </ModalTemplate>
  // );

  if (!user.hasMeetingCode) {
    return <MeetingCode onSubmit={onSubmitPasscode} />;
  }
  // child is <Meeting />
  return children;
}
