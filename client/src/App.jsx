import { useState, createContext, useEffect } from "react";
//Assets
import "./assets/scss/App.scss";
//External
import { Routes, Route, Navigate } from "react-router-dom";
//Hooks
import useUser from "./hooks/useUser";
import useToasts from "./hooks/useToasts";
//Components
import LoadingSpinner from "./shared/LoadingSpinner";
import Header from "./shared/Header";
import Welcome from "./shared/Welcome";
import UsersOnly from "./features/meeting/UsersOnly";
import Meeting from "./features/meeting/Meeting";
import Profile from "./features/profile/Profile";
import ErrorPage from "./shared/ErrorPage";
import Toasts from "./shared/Toasts";

export const UserContext = createContext();
export const ToastContext = createContext();
export const ThemeContext = createContext();

export default function App() {
  const [isDark, setIsDark] = useState(false);

  const [user, fetchUser, loading, error] = useUser(
    "get",
    "/auth/current_user"
  );
  const toasts = useToasts();

  localStorage.setItem("isDark", false);

  async function setDarkMode(dark) {
    await setIsDark(dark);
    await localStorage.setItem("isDark", false);
  }

  useEffect(() => {
    localStorage.setItem("isDark", false);
    setDarkMode(localStorage.getItem("isDark"));
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <Navigate to="/error" />;

  return (
    <div className={isDark ? "App dark" : "App"}>
      <ThemeContext.Provider value={isDark}>
        <UserContext.Provider value={user}>
          <ToastContext.Provider value={toasts}>
            <Header toggleDarkMode={() => setDarkMode(!isDark)} />
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

                <Route path="/error" element={<ErrorPage error={error} />} />
              </Routes>

              <Toasts data={toasts.toasts} removeToast={toasts.removeToast} />
            </main>
          </ToastContext.Provider>
        </UserContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}
