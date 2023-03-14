import { createContext } from "react";
//External
import { Routes, Route } from "react-router-dom";
//Internal
import useUser from "./components/hooks/useUser";
import "./assets/scss/App.scss";
//Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import UsersOnly from "./components/utilities/UsersOnly";
import PresentUsersOnly from "./components/utilities/PresentUsersOnly";
import Meeting from "./components/pages/Meeting";

//Context for logged in user data:
export const UserContext = createContext();

export default function App() {
  const user = useUser();

  /**
   * Assesses whether or not the passcode the user entered is valid and correct
   * @param {String} inputCode the code the user entered
   */
  // async function checkPasscode(inputCode) {
  //   const response = await axiosFetch("post", "/auth/code", {
  //     enteredCode: inputCode,
  //   });
  //   setCurrentUser(response.data);
  // }

  return (
    <div className="App">
      <UserContext.Provider value={user}>
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
                  // onSubmitPasscode={(inputCode) => checkPasscode(inputCode)}
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
