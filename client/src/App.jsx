import { createContext } from "react";
//Assets
import "./assets/scss/App.scss";
//External
import { Routes, Route, Navigate } from "react-router-dom";
//Hooks
import useUser from "./hooks/useUser";
import useDarkMode from "./hooks/useDarkMode";
import useToasts from "./hooks/useToasts";
import useMeeting from "./hooks/useMeeting";
//Components
import LoadingSpinner from "./shared/LoadingSpinner";
import Header from "./shared/Header";
import Welcome from "./shared/Welcome";
import UsersOnly from "./features/meeting/UsersOnly";
import Meeting from "./features/meeting/Meeting";
import AdminView from "./features/meeting/meeting-responses/admin-view/AdminView";
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
  const [
    signIns,
    meetingLoading,
    currentGroup,
    getSignIns,
    submitSignIn,
    deleteSignIn,
  ] = useMeeting("get", `/signIns/${user.group}`);

  if (loading || meetingLoading) return <LoadingSpinner />;

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
                  user.advizotID ? (
                    <Navigate to={`meeting/${user.group}`} />
                  ) : (
                    <Welcome />
                  )
                }
              />

              <Route
                path="handleRoomCode"
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
                path="meeting"
                element={user.advizotID ? <Meeting /> : <Navigate to="/" />}
              >
                <Route
                  path=":group"
                  element={
                    user.role === "admin" ? (
                      <AdminView
                        signIns={signIns}
                        currentGroup={currentGroup}
                        handleSubmitEdits={async (
                          signInToSubmit,
                          existingSignIn
                        ) => {
                          await submitSignIn(signInToSubmit, existingSignIn);
                        }}
                        handleDelete={async (signInID) => {
                          await deleteSignIn(signInID);
                        }}
                        // handleNewSignInClick={() => setFormShown(!formShown)}
                        handleGroupChangeSubmit={async (groupToChange) =>
                          await getSignIns(
                            "get",
                            `/signIns/${groupToChange?.group}`
                          )
                        }
                      />
                    ) : (
                      <Navigate to="/" />
                    )
                  }
                />
              </Route>

              <Route
                path="profile"
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
