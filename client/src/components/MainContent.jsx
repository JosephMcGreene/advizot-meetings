//External
import { Routes, Route } from "react-router-dom";
//Components
import UsersOnly from "./utilities/UsersOnly";

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
          path="/meeting"
          element={<UsersOnly onSubmitPasscode={onSubmitPasscode} />}
        />
      </Routes>
    </main>
  );
}
