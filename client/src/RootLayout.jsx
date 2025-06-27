// Components
import Header from "./header/Header";
// External
import { Outlet } from "react-router-dom";

export default function RootLayout({ darkMode, toggleDarkMode }) {
  return (
    <>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
}
