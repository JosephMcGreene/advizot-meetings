import { createContext } from "react";
//Assets
import "./assets/scss/App.scss";
//External
import { Routes, Route, Navigate } from "react-router-dom";
//Hooks
import useUser from "./hooks/useUser";
import useDarkMode from "./hooks/useDarkMode";
import useToasts from "./hooks/useToasts";
//Components
import LoadingSpinner from "./shared/LoadingSpinner";
import Header from "./shared/Header";
import Welcome from "./shared/Welcome";
import UsersOnly from "./features/meeting/UsersOnly";
import Meeting from "./features/meeting/Meeting";
import Profile from "./features/profile/Profile";
import Toasts from "./shared/Toasts";

export const UserContext = createContext();
export const ToastContext = createContext();
export const ThemeContext = createContext();

export default function App() {
  const [user, fetchUser, loading, error] = useUser(
    "get",
    "/auth/current_user"
  );
  const [isDark, setDarkMode] = useDarkMode();
  const toasts = useToasts();

  if (loading) return <LoadingSpinner />;

  return (
    <div className={isDark ? "App dark" : "App"}>
      <UserContext.Provider value={user}>
        <ToastContext.Provider value={toasts}>
          <Header
            darkMode={isDark}
            toggleDarkMode={() => setDarkMode(!isDark)}
          />

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
                      await fetchUser("post", "/roomCode", {
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

            <Toasts data={toasts.toasts} removeToast={toasts.removeToast} />
          </main>
        </ToastContext.Provider>
      </UserContext.Provider>
    </div>
  );
}
