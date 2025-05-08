import { useContext } from "react";
import { UserContext } from "../App";
// Components
import NewRoomCode from "../features/meeting/room-code/NewRoomCode";
import RoomCodePrompt from "../features/meeting/room-code/RoomCodePrompt";
// External
import { Navigate } from "react-router-dom";

export default function UsersOnly({ handleSubmitCode }) {
  const user = useContext(UserContext);

  if (!user) return <Navigate to="/" />;

  if (user.role === "admin") return <NewRoomCode />;

  return (
    <RoomCodePrompt handleSubmitCode={handleSubmitCode}>
      <Navigate to={`/meeting/${user.group}`} />
    </RoomCodePrompt>
  );
}
