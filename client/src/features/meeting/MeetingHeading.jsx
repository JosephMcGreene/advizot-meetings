import { useState } from "react";
//External
import { Outlet } from "react-router-dom";
//Internal
import { currentDate } from "../../helpers";
//Components
import RoomCodeToggle from "./admin-actions/RoomCodeToggle";
import RoomCodeDisplay from "./room-code/RoomCodeDisplay";

export default function MeetingHeading({ currentGroup }) {
  const [roomCodeShown, setRoomCodeShown] = useState(false);

  return (
    <>
      <div className="heading-container">
        <h1 className="meeting-heading">
          {currentGroup === "admin" ? (
            <select>
              <option value="admin">Admins</option>
              <option value="CE5660">CE5660</option>
              <option value="KEY9330">KEY9330</option>
              <option value="CE4659">CE4659</option>
              <option value="guest">Guests</option>
            </select>
          ) : (
            currentGroup
          )}{" "}
          - {currentDate("month")} {currentDate("year")}
        </h1>
        <RoomCodeToggle
          handleClick={() => setRoomCodeShown(!roomCodeShown)}
          roomCodeShown={roomCodeShown}
        />
      </div>

      {roomCodeShown && <RoomCodeDisplay />}

      <Outlet />
    </>
  );
}
