import { createContext } from "react";
// Assets
import "./assets/scss/App.scss";
// Components
import CheckIn from "./check-in/CheckIn";
import Header from "./header/Header";
import LoadingSpinner from "./shared/LoadingSpinner";
import Meeting from "./meeting/Meeting";
import Profile from "./profile/Profile";
import RoomCodeCheck from "./meeting/room-code/RoomCodeCheck";
import Toasts from "./shared/Toasts";
import UsersOnly from "./shared/UsersOnly";
import Welcome from "./shared/Welcome";
// External
// prettier-ignore
import { createBrowserRouter, createRoutesFromElements, Navigate, RouterProvider, Route } from "react-router-dom";
// Hooks
import useDarkMode from "./hooks/useDarkMode";
import useToasts from "./hooks/useToasts";
import useUser from "./hooks/useUser";

export const UserContext = createContext();
export const ToastContext = createContext();
export const ThemeContext = createContext();

export default function App() {
  const [user, fetchUser, loading] = useUser("get", "/auth/current_user");
  const [isDark, setDarkMode] = useDarkMode();
  const toasts = useToasts();

  async function submitCode(enteredCode) {
    await fetchUser("post", "/roomCode", { enteredCode });
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className={isDark ? "App dark" : "App"}>
      <UserContext.Provider value={user}>
        <ToastContext.Provider value={toasts}>
          <main className="main-content">
            <RouterProvider
              router={createBrowserRouter(
                createRoutesFromElements(
                  <Route
                    path="/"
                    // prettier-ignore
                    element={<Header darkMode={isDark} toggleDarkMode={() => setDarkMode(!isDark)} />}
                  >
                    <Route index element={<Welcome />} />

                    <Route
                      path="handleRoomCode"
                      element={
                        <UsersOnly>
                          {/* prettier-ignore */}
                          <RoomCodeCheck handleSubmitCode={(enteredCode) => submitCode(enteredCode)}>
                            <Navigate to={`/meeting/${user.group}`} />
                          </RoomCodeCheck>
                        </UsersOnly>
                      }
                    />

                    <Route
                      path="meeting/:group"
                      element={
                        <UsersOnly>
                          {/* prettier-ignore */}
                          <RoomCodeCheck handleSubmitCode={(enteredCode) => submitCode(enteredCode)}>
                            <Meeting />
                          </RoomCodeCheck>
                        </UsersOnly>
                      }
                    />

                    <Route
                      path="profile/:advizotID"
                      element={
                        <UsersOnly>
                          <Profile />
                        </UsersOnly>
                      }
                    />

                    <Route
                      path="check-in/:advizotID"
                      element={
                        <UsersOnly>
                          <CheckIn />
                        </UsersOnly>
                      }
                    />
                  </Route>
                )
              )}
            />
            <Toasts data={toasts.toasts} removeToast={toasts.removeToast} />
          </main>
        </ToastContext.Provider>
      </UserContext.Provider>
    </div>
  );
}
