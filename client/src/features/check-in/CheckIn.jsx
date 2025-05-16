import { useContext } from "react";
import { UserContext } from "../../App";
// Components
import LoadingSpinner from "../../shared/LoadingSpinner";
import MainForm from "../../shared/form/MainForm";
// External
import { useNavigate } from "react-router-dom";
// Internal
import { currentDate } from "../../helpers";
// Hooks
import useMeeting from "../meeting/useMeeting";

export default function CheckIn() {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [signIns, loading, submitSignIns] = useMeeting();

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <h1>
        Hi, {user.firstName}. Check in for {currentDate("month")}'s one-to-one
        with Kevin:
      </h1>

      <MainForm
        handleClose={() => navigate(`/meeting/${user.group}`)}
        handleSubmit={async (checkIn, existingCheckIn) =>
          await submitSignIns(true, checkIn, existingCheckIn)
        }
      />
    </>
  );
}
