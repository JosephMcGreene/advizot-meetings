import { useContext } from "react";
import { UserContext } from "../../../App";

export default function ActionsBtn({ handleClick, children }) {
  const user = useContext(UserContext);

  return (
    <button type="button" onClick={() => handleClick()} className="actions-btn">
      {children}
    </button>
  );
}
