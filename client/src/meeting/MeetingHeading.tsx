import { useState, useContext } from "react";
import { UserContext } from "../App";
// Components
import RoomCodeDisplay from "./room-code/RoomCodeDisplay";
import RoomCodeToggle from "./admin-actions/RoomCodeToggle";
// External
import { useNavigate, Outlet } from "react-router-dom";
// Internal
import { currentDate } from "../helpers";
// Types
import type { User } from "../types/user.d.ts";

type Props = {
  getNewRoomCode: () => void;
  group: string;
};

export default function MeetingHeading({ getNewRoomCode, group }: Props) {
  const user: User | null = useContext(UserContext);
  const [roomCodeShown, setRoomCodeShown] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");
  const navigate = useNavigate();

  async function handleChange(e) {
    await setSelectedGroup(e.target.value);
    await navigate(`/meeting/${e.target.value}`);
  }

  return (
    <>
      <h1 className="meeting-heading">
        {user.role === "admin" ? (
          <select value={selectedGroup} onChange={(e) => handleChange(e)}>
            <option>{group}</option>
            <option value="admin">Admins</option>
            <option value="CE5660">CE5660</option>
            <option value="KEY9330">KEY9330</option>
            <option value="CE4659">CE4659</option>
            <option value="guest">Guests</option>
          </select>
        ) : (
          group
        )}{" "}
        {currentDate("month")} {currentDate("year")}
      </h1>

      <div className="room-code-container">
        {user.role === "admin" && (
          <RoomCodeToggle
            roomCodeShown={roomCodeShown}
            setRoomCodeShown={setRoomCodeShown}
          />
        )}

        {roomCodeShown && <RoomCodeDisplay getNewRoomCode={getNewRoomCode} />}
      </div>

      <Outlet />
    </>
  );
}
