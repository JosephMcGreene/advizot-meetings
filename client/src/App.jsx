import { useState, createContext } from "react";
//Assets
import "./assets/scss/App.scss";
//External
import { Routes, Route, Navigate } from "react-router-dom";
//Hooks
import useUser from "./hooks/useUser";
//Components
import LoadingSpinner from "./shared/LoadingSpinner";
import ErrorPage from "./shared/ErrorPage";
import Header from "./shared/Header";
import Welcome from "./shared/Welcome";
import UsersOnly from "./features/meeting/UsersOnly";
import Meeting from "./features/meeting/Meeting";
import Profile from "./features/profile/Profile";

//Logged-in user data context:
export const UserContext = createContext();

export default function App() {
  const [toasts, setToasts] = useState([]);
  const [autoClose, setAutoClose] = useState(true);
  const [autoCloseDuration, setAutoCloseDuration] = useState(5);
  const [position, setPosition] = useState("top-right");

  const [user, fetchUser, loading, error] = useUser(
    "get",
    "/auth/current_user"
  );

  function showToast(message, type) {
    const toast = {
      id: Date.now(),
      message,
      type,
    };

    setToasts((prevToasts) => [...prevToasts, toast]);

    if (autoClose) {
      setTimeout(() => {}, autoCloseDuration * 1000);
    }
  }

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage error={error} />;

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <Header />

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                user.advizotID ? <Navigate to="/meeting" /> : <Welcome />
              }
            />

            <Route
              path="/handleRoomCode"
              element={
                <UsersOnly
                  handleSubmitCode={async (enteredCode) => {
                    await fetchUser("post", "/roomCode/submitRoomCode", {
                      enteredCode,
                    });
                  }}
                />
              }
            />

            <Route
              path="/meeting"
              element={user.advizotID ? <Meeting /> : <Navigate to="/" />}
            />

            <Route
              path="/profile"
              element={user.advizotID ? <Profile /> : <Navigate to="/" />}
            />
          </Routes>
        </main>
      </UserContext.Provider>
    </div>
  );
}
