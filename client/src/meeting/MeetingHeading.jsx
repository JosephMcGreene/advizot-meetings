import { useState, useContext } from "react";
import { UserContext } from "../App";
// Assets
import { ReactComponent as MemberEditIcon } from "../assets/img/users-gear-solid.svg";
// Components
import MemberEditModal from "./MemberEditModal";
import ModalTemplate from "../shared/modals/ModalTemplate";
import RoomCodeDisplay from "./room-code/RoomCodeDisplay";
import RoomCodeToggle from "./room-code/RoomCodeToggle";
// External
import { useNavigate, Outlet } from "react-router-dom";
// Internal
import { currentDate } from "../helpers";

export default function MeetingHeading({ getNewRoomCode, group }) {
  const user = useContext(UserContext);
  const [roomCodeShown, setRoomCodeShown] = useState(false);
  const [memberEditModalShown, setMemberEditModalShown] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");
  const navigate = useNavigate();

  async function handleChange(e) {
    await setSelectedGroup(e.target.value);
    await navigate(`/meeting/${e.target.value}`);
  }

  return (
    <>
      <div className="meeting-heading">
        {user.role === "admin" ? (
          <>
            <button
              className="edit-group-btn"
              onClick={() => setMemberEditModalShown(true)}
              type="button"
            >
              <MemberEditIcon className="icon" />
            </button>

            <select value={selectedGroup} onChange={(e) => handleChange(e)}>
              <option>{group}</option>
              <option value="admin">Admins</option>
              <option value="CE5660">CE5660</option>
              <option value="KEY9330">KEY9330</option>
              <option value="CE4659">CE4659</option>
              <option value="guest">Guests</option>
            </select>

            {memberEditModalShown && (
              <ModalTemplate
                handleClose={() => setMemberEditModalShown(false)}
                title="Edit Members"
              >
                <MemberEditModal
                  currentGroup={group}
                  handleClose={() => setMemberEditModalShown(false)}
                />
              </ModalTemplate>
            )}
          </>
        ) : (
          group
        )}{" "}
        <h1>
          {currentDate("month")} {currentDate("year")}
        </h1>
      </div>

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
