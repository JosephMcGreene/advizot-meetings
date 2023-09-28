import { createContext } from "react";
//Assets
import "./assets/scss/App.scss";
//External
import { Routes, Route, Navigate } from "react-router-dom";
//Hooks
import useUser from "./hooks/useUser";
import useToasts from "./hooks/useToasts";
//Components
import LoadingSpinner from "./shared/LoadingSpinner";
import ErrorPage from "./shared/ErrorPage";
import Header from "./shared/Header";
import Welcome from "./shared/Welcome";
import UsersOnly from "./features/meeting/UsersOnly";
import Meeting from "./features/meeting/Meeting";
import Profile from "./features/profile/Profile";
import ToastList from "./shared/ToastList";

//Logged-in user data context:
export const UserContext = createContext();
export const ToastContext = createContext();

export default function App() {
  const [user, fetchUser, loading, error] = useUser(
    "get",
    "/auth/current_user"
  );
  const toasts = useToasts();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage error={error} />;

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <ToastContext.Provider value={toasts}>
          <Header />

          <button
            style={{ marginTop: "6rem", marginRight: "1rem" }}
            onClick={() => toasts.showToast("success", "It worked!")}
          >
            Success Toast
          </button>
          <button
            style={{ marginTop: "6rem", marginRight: "1rem" }}
            onClick={() => toasts.showToast("failure", "It didn't work!")}
          >
            Failure Toast
          </button>
          <button onClick={() => toasts.showToast("warning", "Warning!")}>
            Warning Toast
          </button>

          <main className="main-content">
            <ToastList data={toasts.toasts} removeToast={toasts.removeToast} />

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
        </ToastContext.Provider>
      </UserContext.Provider>
    </div>
  );
}
