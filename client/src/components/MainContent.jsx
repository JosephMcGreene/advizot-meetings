import { useContext } from "react";
import { UserContext } from "../App";
//External
import { Routes, Route, Navigate } from "react-router-dom";
//Components
import Welcome from "./pages/Welcome";
import UsersOnly from "./utilities/UsersOnly";
import Meeting from "./pages/Meeting";

export default function MainContent({ onSubmitRoomCode }) {
  const user = useContext(UserContext);

  return (
    <main className="main-content">
      <Routes>
        <Route
          path="/"
          element={user.advizotID ? <Navigate to="/meeting" /> : <Welcome />}
        />

        <Route
          path="/handleRoomCode"
          element={<UsersOnly onSubmitRoomCode={onSubmitRoomCode} />}
        />

        <Route
          path="/meeting"
          element={user.advizotID ? <Meeting /> : <Navigate to="/" />}
        />
      </Routes>
    </main>
  );
}
