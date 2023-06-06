import { createContext } from "react";
//Assets
import "./assets/scss/App.scss";
//Hooks
import useUser from "./hooks/useUser";
//Components
import LoadingSpinner from "./components/utilities/LoadingSpinner";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
// import Footer from "./components/Footer";

//Logged-in user data context:
export const UserContext = createContext();

export default function App() {
  //eslint-disable-next-line
  const [user, fetchUser, loading, error] = useUser(
    "get",
    "/auth/current_user"
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <Header />
        <MainContent
          onSubmitRoomCode={(enteredCode) => {
            fetchUser("post", "/roomCode/submitRoomCode", { enteredCode });
          }}
        />
        {/* <Footer /> */}
      </UserContext.Provider>
    </div>
  );
}
