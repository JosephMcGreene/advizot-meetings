import { useContext } from "react";
import { UserContext } from "../../../App";
// Internal
import RoomCodeEntry from "./RoomCodeEntry";

export default function RoomCodeCheck({ children, handleSubmitCode }) {
  const user = useContext(UserContext);

  if (!user.hasMeetingCode && user.role !== "admin") {
    return <RoomCodeEntry handleSubmit={handleSubmitCode} incorrectcode />;
  }

  return children;
}
