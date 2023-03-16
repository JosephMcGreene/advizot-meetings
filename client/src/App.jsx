import { createContext } from "react";
//Assets
import "./assets/scss/App.scss";
//Hooks
import useAxios from "./hooks/useAxios";
//Components
import LoadingSpinner from "./components/utilities/LoadingSpinner";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";

//Context for logged in user data:
export const UserContext = createContext();

export default function App() {
  const [user, loading, error, fetchUser] = useAxios(
    "get",
    "/auth/current_user"
  );

  if (loading) return <LoadingSpinner />;
  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <Header />
        <MainContent
          onSubmitPasscode={(inputCode) => {
            fetchUser("post", "/auth/code", { enteredCode: inputCode });
          }}
        />
        <Footer />
      </UserContext.Provider>
    </div>
  );
}
