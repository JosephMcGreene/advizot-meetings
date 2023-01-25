import React from "react";
// import React, { useState, useEffect } from "react";
//External
// import axios from "axios";
import { Routes, Route } from "react-router-dom";
//Internal & Components
import "./scss/App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UsersOnly from "./utilities/UsersOnly";
import PresentUsersOnly from "./utilities/PresentUsersOnly";
import Meeting from "./components/pages/Meeting";
import { useAxios } from "./components/hooks/useAxios";
import { useCurrentUser } from "./components/hooks/useCurrentUser";
//Context for logged in user data currentUser:
export const UserContext = React.createContext();

export default function App() {
  const currentUser = useCurrentUser();

  //=====HELPERS=====
  /**
   * Assesses whether or not the passcode the user entered is valid and correct
   * @param {String} inputCode the code the user entered
   */
  // async function checkPasscode(inputCode) {
  //   try {
  //     const response = await axios({
  //       method: "post",
  //       url: "/auth/code",
  //       data: { enteredCode: inputCode },
  //       withCredentials: true,
  //     });
  //     setCurrentUser(response.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <div className="App">
      <UserContext.Provider value={currentUser}>
        <Header />
        {console.log(currentUser)}

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
                  // onSubmit={(inputCode) => checkPasscode(inputCode)}
                  >
                    <Meeting />
                  </PresentUsersOnly>
                </UsersOnly>
              }
            />

            {/* <Route
              path="/profile"
              element={
                <UsersOnly>
                  <Profile />
                </UsersOnly>
              }
            /> */}
          </Routes>
        </main>

        <Footer />
      </UserContext.Provider>
    </div>
  );
}
