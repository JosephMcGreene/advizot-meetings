import { createContext } from "react";
//Assets
import "./assets/scss/App.scss";
//Hooks
import useUser from "./hooks/useUser";
//Components
import LoadingSpinner from "./components/utilities/LoadingSpinner";
import Error from "./components/utilities/Error";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";

//Context for logged in user data:
export const UserContext = createContext();

export default function App() {
  const [user, fetchUser, loading, error] = useUser(
    "get",
    "/auth/current_user"
  );

  if (loading) return <LoadingSpinner />;
  if (error !== null) return <Error error={error} />;

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <Header />
        <MainContent
          onSubmitPasscode={(enteredCode) => {
            fetchUser("post", "/passcode/passcode", { enteredCode });
          }}
        />
        <Footer />
      </UserContext.Provider>
    </div>
  );
}
