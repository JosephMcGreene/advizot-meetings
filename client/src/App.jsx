import { createContext } from "react";
//Assets
import "./assets/scss/App.scss";
//External
import { Routes, Route, Navigate } from "react-router-dom";
//Hooks
import useUser from "./hooks/useUser";
//Components
import LoadingSpinner from "./shared/LoadingSpinner";
import Header from "./shared/Header";
import Welcome from "./shared/Welcome";
import UsersOnly from "./features/meeting/UsersOnly";
import Meeting from "./features/meeting/Meeting";
import Profile from "./features/profile/Profile";

//Logged-in user data context:
export const UserContext = createContext();

export default function App() {
  //eslint-disable-next-line
  const [user, fetchUser, loading, error] = useUser(
    "get",
    "/auth/current_user"
  );

  if (loading) return <LoadingSpinner />;
<<<<<<< HEAD
  if (error !== null) return <Error error={error} />;
=======
>>>>>>> dcd4cbc5e649dd3f86831a7f80f22a54b27737fc

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
                  onSubmitRoomCode={(enteredCode) => {
                    fetchUser("post", "/roomCode/submitRoomCode", {
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
