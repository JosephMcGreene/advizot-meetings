import { useState } from "react";

export default function useDarkMode() {
  const darkMode = JSON.parse(localStorage.getItem("isDark"));
  const [isDark, setIsDark] = useState(darkMode);

  function setDarkMode(darkOrLight) {
    setIsDark(darkOrLight);
    localStorage.setItem("isDark", JSON.stringify(darkOrLight));
  }

	return [isDark, setDarkMode];
}
