import React, { useState, useEffect } from "react";
//External
import axios from "axios";
import { Routes, Route } from "react-router-dom";
//Internal & Components
import "./scss/App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserRoute from "./components/utilities/UserRoute";
import MeetingContent from "./components/pages/MeetingContent";
//Context for logged in user data currentUser:
export const UserContext = React.createContext();

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
    try {
      const currentUserInfo = await axios("/auth/current_user", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(currentUserInfo);
      setCurrentUser(currentUserInfo.data);
    } catch (error) {
      console.error(error);
    }
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
              path="/app"
              element={
                <UserRoute>
                  <MeetingContent />
                </UserRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </UserContext.Provider>
    </div>
  );
}
