import { useState, useContext } from "react";
import { UserContext } from "../../App";
//External
import { useNavigate, Outlet } from "react-router-dom";
//Internal
import { currentDate } from "../../helpers";
//Components
import RoomCodeToggle from "./admin-actions/RoomCodeToggle";
import RoomCodeDisplay from "./room-code/RoomCodeDisplay";

export default function MeetingHeading({ currentGroup }) {
  const user = useContext(UserContext);
  const [roomCodeShown, setRoomCodeShown] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");
  const navigate = useNavigate();

  async function handleChange(e) {
    await setSelectedGroup(e.target.value);
    await navigate(`/meeting/${e.target.value}`);
  }

  return (
    <>
      <div className="heading-container">
        <h1 className="meeting-heading">
          {user.role === "admin" ? (
            <select value={selectedGroup} onChange={(e) => handleChange(e)}>
              <option>{currentGroup}</option>
              <option value="admin">Admins</option>
              <option value="CE5660">CE5660</option>
              <option value="KEY9330">KEY9330</option>
              <option value="CE4659">CE4659</option>
              <option value="guest">Guests</option>
            </select>
          ) : (
            currentGroup
          )}
          {""}
          {currentDate("month")} {currentDate("year")}
        </h1>
      </div>

      <div className="room-code-container">
        <RoomCodeToggle
          setRoomCodeShown={setRoomCodeShown}
          roomCodeShown={roomCodeShown}
        />

        {roomCodeShown && <RoomCodeDisplay />}
      </div>

      <Outlet />
    </>
  );
}
