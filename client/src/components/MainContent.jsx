import { useContext } from "react";
import { UserContext } from "../App";
//External
import { Routes, Route, Navigate } from "react-router-dom";
//Components
import Welcome from "./pages/Welcome";
import UsersOnly from "./utilities/UsersOnly";
import Meeting from "./pages/Meeting";

export default function MainContent({ onSubmitPasscode }) {
  const user = useContext(UserContext);

  return (
    <main className="main-content">
      <Routes>
        <Route
          path="/"
          element={user.advizotID ? <Navigate to="/meeting" /> : <Welcome />}
        />

        <Route
          path="/meetingCode"
          element={
            user.advizotID ? (
              <UsersOnly onSubmitPasscode={onSubmitPasscode} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/meeting"
          element={user.advizotID ? <Meeting /> : <Navigate to="/" />}
        />
      </Routes>
    </main>
  );
}
