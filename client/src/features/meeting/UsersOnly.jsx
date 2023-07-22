import { useContext } from "react";
import { UserContext } from "../../App";
//External
import { Navigate } from "react-router-dom";
//Components
import NewRoomCode from "./room-code/NewRoomCode";
import RoomCodePrompt from "./room-code/RoomCodePrompt";

export default function UsersOnly({ onSubmitRoomCode }) {
  const user = useContext(UserContext);

  if (!user) return <Navigate to="/" />;

  if (user.role === "admin") return <NewRoomCode />;

  return (
    <RoomCodePrompt onSubmitRoomCode={onSubmitRoomCode}>
      <Navigate to="/meeting" />
    </RoomCodePrompt>
  );
}
