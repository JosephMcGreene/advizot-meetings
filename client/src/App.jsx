import { useState, useEffect, createContext } from "react";
//External
import { Routes, Route } from "react-router-dom";
//Internal
import { axiosFetch } from "./helpers";
import "./scss/App.scss";
//Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import UsersOnly from "./components/utilities/UsersOnly";
import PresentUsersOnly from "./components/utilities/PresentUsersOnly";
import Meeting from "./components/pages/Meeting";

//Context for logged in user data currentUser:
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

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <h1 className="welcome">
                  Welcome! <br /> Please sign in to continue.
                </h1>
              }
            />

            <Route
              path="/meeting"
              element={
                <UsersOnly>
                  <PresentUsersOnly
                    onSubmit={(inputCode) => checkPasscode(inputCode)}
                  >
                    <Meeting />
                  </PresentUsersOnly>
                </UsersOnly>
              }
            />
          </Routes>
        </main>

        <Footer />
      </UserContext.Provider>
    </div>
  );
}
