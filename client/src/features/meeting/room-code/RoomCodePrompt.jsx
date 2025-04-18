import { useContext } from "react";
import { UserContext } from "../../../App";
// Components
import RoomCodeEntry from "./RoomCodeEntry";

export default function RoomCodePrompt({ handleSubmitCode, children }) {
  const user = useContext(UserContext);

  if (!user.hasMeetingCode) {
    return <RoomCodeEntry handleSubmit={handleSubmitCode} incorrectCode />;
  }
  // child is <Navigate to="/meeting" />
  return children;
}
