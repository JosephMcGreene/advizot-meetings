import { useContext } from "react";
//Context
import { UserContext } from "../App";
//External
import { Routes, Route, Navigate } from "react-router-dom";
//Components
import UsersOnly from "./utilities/UsersOnly";
import Meeting from "./pages/Meeting";

export default function MainContent({ onSubmitPasscode }) {
  const user = useContext(UserContext);

  return (
    <main className="main-content">
      <Routes>
        <Route
          path="/"
          element={
            <h1 className="welcome">
              Welcome! <br /> Please sign in to continue.
            </h1>
          }
        />

        <Route
          path="/meetingCode"
          element={<UsersOnly onSubmitPasscode={onSubmitPasscode} />}
        />

        <Route
          path="/meeting"
          element={user.advizotID ? <Meeting /> : <Navigate to="/" />}
        />
      </Routes>
    </main>
  );
}
