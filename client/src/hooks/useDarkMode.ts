import { useState } from "react";

export default function useDarkMode() {
  const darkMode: boolean = JSON.parse(localStorage.getItem("isDark"));
  const [isDark, setIsDark] = useState(darkMode);

  function setDarkMode(darkOrLight: boolean) {
    setIsDark(darkOrLight);
    localStorage.setItem("isDark", JSON.stringify(darkOrLight));
  }

  return [isDark, setDarkMode];
}
