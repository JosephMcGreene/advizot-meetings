import { useContext } from "react";
import { UserContext } from "../../App";
//Components
import RoomCodeEntry from "../pages/RoomCodeEntry";

export default function RoomCodePrompt({ onSubmitRoomCode, children }) {
  const user = useContext(UserContext);

  if (!user.hasMeetingCode) {
    return <RoomCodeEntry onSubmit={onSubmitRoomCode} />;
  }
  // child is <Meeting />
  return children;
}
