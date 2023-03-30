//External
import { Routes, Route } from "react-router-dom";
//Components
import UsersOnly from "./utilities/UsersOnly";
import Meeting from "./pages/Meeting";
import Error from "./utilities/Error";

export default function MainContent({ onSubmitPasscode }) {
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

        <Route path="/meeting" element={<Meeting />} />

        <Route path="/error" element={<Error />} />
      </Routes>
    </main>
  );
}
