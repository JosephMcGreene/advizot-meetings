import { useContext } from "react";
import { ThemeContext } from "../../../App";

export default function ActionsBtn({ handleClick, children }) {
  const isDark = useContext(ThemeContext);

  return (
    <button
      type="button"
      onClick={() => handleClick()}
      className={isDark ? "actions-btn dark" : "actions-btn"}
    >
      {children}
    </button>
  );
}
