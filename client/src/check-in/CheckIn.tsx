import { useContext } from "react";
import { UserContext } from "../App";
// Components
import LoadingSpinner from "../shared/LoadingSpinner";
import MainForm from "../shared/form/MainForm";
// External
import { useNavigate } from "react-router-dom";
// Internal
import { currentDate } from "../helpers";
// Hooks
import useMeeting from "../hooks/useMeeting";
// Types
import type { SignIn } from "../types/signIn.d.ts";
import type { User } from "../types/user.d.ts";

export default function CheckIn() {
  const user: User | null = useContext(UserContext);
  const navigate = useNavigate();
  const [signIns, loading, submitSignIns] = useMeeting();

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <h1 className="centered-heading">
        Hi, {user?.firstName}. Check in for {currentDate("month")}'s one-to-one
        with Kevin:
      </h1>

      <MainForm
        handleClose={() => navigate(`/meeting/${user?.group}`)}
        handleSubmit={async (checkIn: SignIn, existingCheckIn: SignIn) =>
          await submitSignIns(true, checkIn, existingCheckIn)
        }
      />
    </>
  );
}
