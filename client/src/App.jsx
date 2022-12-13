import React, { useState, useEffect } from "react";
//External
import axios from "axios";
import { Routes, Route } from "react-router-dom";
//Internal & Components
import "./scss/App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/utilities/PrivateRoute";
import MeetingCode from "./components/pages/MeetingCode";
import CodeRoute from "./components/utilities/CodeRoute";
import MeetingContent from "./components/pages/MeetingContent";
//Context for logged in user data currentUser:
export const UserContext = React.createContext();

export default function App() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    getCurrentUser();
  }, [currentUser]);

  //=====HELPERS=====
  /**
   * makes request for info on the current user and updates currentUser state accordingly
   */
  async function getCurrentUser() {
    try {
      const currentUserInfo = await axios("/auth/current_user", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      // console.log(currentUserInfo.data);
      setCurrentUser(currentUserInfo.data);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Assesses whether or not the passcode the user entered is valid and correct
   * @param {String} inputCode the code the user entered
   * @returns {Function} changes the state of gaveCorrectPassCode to reflect whether the user can continue and view the rest of the app or must try again
   */
  async function handlePasscodeSubmit(inputCode) {
    const codeCheck = await axios({
      method: "post",
      url: "/auth/code",
      data: { enteredCode: inputCode },
    });
    console.log(codeCheck.data);
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
              path="/meetingCode"
              element={
                <PrivateRoute>
                  <MeetingCode
                    onCodeSubmit={(inputCode) =>
                      handlePasscodeSubmit(inputCode)
                    }
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/meeting"
              element={
                <CodeRoute hasCorrectCode={true}>
                  <MeetingContent />
                </CodeRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </UserContext.Provider>
    </div>
  );
}
