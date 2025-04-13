import { createContext } from "react";
//Assets
import "./assets/scss/App.scss";
//External
// prettier-ignore
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
//Hooks
import useUser from "./hooks/useUser";
import useDarkMode from "./hooks/useDarkMode";
import useToasts from "./hooks/useToasts";
//Components
import LoadingSpinner from "./shared/LoadingSpinner";
import Welcome from "./shared/Welcome";
import UsersOnly from "./features/meeting/UsersOnly";
import Meeting from "./features/meeting/Meeting";
import Profile from "./features/profile/Profile";
import Header from "./shared/Header";
import Toasts from "./shared/Toasts";

export const UserContext = createContext();
export const ToastContext = createContext();
export const ThemeContext = createContext();

export default function App() {
  const [user, fetchUser, loading] = useUser("get", "/auth/current_user");
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
                    // prettier-ignore
                    element={<Header darkMode={isDark} toggleDarkMode={() => setDarkMode(!isDark)} />}
                  >
                    <Route index element={<Welcome />} />

                    <Route
                      path="handleRoomCode"
                      element={
                        // prettier-ignore
                        <UsersOnly
                          handleSubmitCode={async (enteredCode) => {
                            await fetchUser("post", "/roomCode", { enteredCode })
                          }}
                        />
                      }
                    />

                    <Route path="meeting/:group" element={<Meeting />} />

                    <Route path="profile" element={<Profile />} />
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
