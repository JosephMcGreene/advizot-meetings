import { useState, useEffect, createContext } from "react";
//Internal
import { axiosFetch } from "./helpers";
import "./assets/scss/App.scss";
//Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainContent from "./components/MainContent";

//Context for logged in user data:
export const UserContext = createContext();

export default function App() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    getCurrentUser();
  }, []);

  //=====HELPERS=====
  /**
   * makes request for info on the current user and updates currentUser state accordingly
   */
  async function getCurrentUser() {
    const response = await axiosFetch("get", "/auth/current_user");
    setCurrentUser(response.data);
  }

  /**
   * Assesses whether or not the passcode the user entered is valid and correct
   * @param {String} inputCode the code the user entered
   */
  async function checkPasscode(inputCode) {
    const response = await axiosFetch("post", "/auth/code", {
      enteredCode: inputCode,
    });
    setCurrentUser(response.data);
  }

  return (
    <div className="App">
      <UserContext.Provider value={currentUser}>
        <Header />

        <MainContent
          onSubmitPasscode={(inputCode) => checkPasscode(inputCode)}
        />

        <Footer />
      </UserContext.Provider>
    </div>
  );
}
