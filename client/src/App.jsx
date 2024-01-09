import { createContext } from "react";
//Assets
import "./assets/scss/App.scss";
//External
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
//Hooks
import useUser from "./hooks/useUser";
import useDarkMode from "./hooks/useDarkMode";
import useToasts from "./hooks/useToasts";
//Components
import LoadingSpinner from "./shared/LoadingSpinner";
import Welcome from "./shared/Welcome";
import UsersOnly from "./features/meeting/UsersOnly";
import MeetingHeading from "./features/meeting/MeetingHeading";
import Meeting from "./features/meeting/Meeting";
import Profile from "./features/profile/Profile";
import Header from "./shared/Header";
import Toasts from "./shared/Toasts";

export const UserContext = createContext();
export const ToastContext = createContext();
export const ThemeContext = createContext();

export default function App() {
  // eslint-disable-next-line
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
          <main className="main-content">
            <RouterProvider
              router={createBrowserRouter(
                createRoutesFromElements(
                  <Route
                    path="/"
                    element={
                      <Header
                        darkMode={isDark}
                        toggleDarkMode={() => setDarkMode(!isDark)}
                      />
                    }
                  >
                    <Route index element={<Welcome />} />

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
                      element={
                        user.advizotID ? (
                          <MeetingHeading currentGroup={user.group} /> //Except we really want the url parameter of the child
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    >
                      <Route
                        path=":group"
                        element={
                          user.advizotID ? <Meeting /> : <Navigate to="/" />
                        }
                      />
                    </Route>

                    <Route
                      path="profile"
                      element={
                        user.advizotID ? <Profile /> : <Navigate to="/" />
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
