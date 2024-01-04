import { useState, useContext } from "react";
import { UserContext } from "../../App";
//External
import { useParams, Outlet } from "react-router-dom";
//Helpers
import { currentDate } from "../../helpers";
//Hooks
import useMeeting from "../../hooks/useMeeting";
//Components
import LoadingSpinner from "../../shared/LoadingSpinner";
import RoomCodeToggle from "./admin-actions/RoomCodeToggle";
import RoomCodeDisplay from "./room-code/RoomCodeDisplay";
import AdminView from "./meeting-responses/admin-view/AdminView";
import MemberView from "./meeting-responses/member-view/MemberView";
import ModalTemplate from "../../shared/modals/ModalTemplate";
import MeetingForm from "./form/MeetingForm";

export default function Meeting() {
  const user = useContext(UserContext);
  const [formShown, setFormShown] = useState(false);
  const [roomCodeShown, setRoomCodeShown] = useState(false);
  const { group } = useParams();

  // const [
  //   signIns,
  //   loading,
  //   currentGroup,
  //   getSignIns,
  //   submitSignIn,
  //   deleteSignIn,
  // ] = useMeeting("get", `/signIns/${user.group}`);

  // if (loading) return <LoadingSpinner />;

  return (
    <>
      <div className="heading-container">
        <h1 className="meeting-heading">
          {group === "admin" ? "Admins" : group} - {currentDate("month")}{" "}
          {currentDate("year")}
        </h1>
        {group === "admin" && (
          <RoomCodeToggle
            handleClick={() => setRoomCodeShown(!roomCodeShown)}
            roomCodeShown={roomCodeShown}
          />
        )}
      </div>
      {roomCodeShown && <RoomCodeDisplay />}

      <Outlet />

      {/* 
      {user.role === "admin" && (
        <AdminView
          signIns={signIns}
          currentGroup={currentGroup}
          handleSubmitEdits={async (signInToSubmit, existingSignIn) => {
            await submitSignIn(signInToSubmit, existingSignIn);
          }}
          handleDelete={async (signInID) => {
            await deleteSignIn(signInID);
          }}
          handleNewSignInClick={() => setFormShown(!formShown)}
          handleGroupChangeSubmit={async (groupToChange) =>
            await getSignIns("get", `/signIns/${groupToChange?.group}`)
          }
        />
      )} */}
      {/* {user.role === "member" && (
        <MemberView
          signIns={signIns}
          handleSubmitEdits={async (signInToSubmit, existingSignIn) => {
            await submitSignIn(signInToSubmit, existingSignIn);
          }}
          handleDelete={async (signInID) => {
            await deleteSignIn(signInID);
          }}
          handleSignInClick={() => setFormShown(!formShown)}
        />
      )} */}
      {/* {formShown && (
        <ModalTemplate
          title={`${currentDate("month")}, ${currentDate("year")}`}
          handleClose={() => setFormShown(false)}
        >
          <MeetingForm
            handleSubmit={(signInToSubmit) => submitSignIn(signInToSubmit)}
            handleClose={() => setFormShown(false)}
          />
        </ModalTemplate> 
      )}*/}
    </>
  );
}
