import { createContext } from "react";
//Internal
import useUser from "./hooks/useUser";
import "./assets/scss/App.scss";
//Components
import LoadingSpinner from "./components/utilities/LoadingSpinner";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";

//Context for logged in user data:
export const UserContext = createContext();

export default function App() {
  const [user, loading, error, fetchUser] = useUser(); //fetches user data, enables refetching

  if (loading) return <LoadingSpinner />;

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <Header />

        <MainContent
          onSubmitPasscode={(inputCode) => {
            fetchUser("post", "/auth/code", {
              enteredCode: inputCode,
            });
          }}
        />

        <Footer />
      </UserContext.Provider>
    </div>
  );
}
