import { useContext } from "react";
import { UserContext } from "../../App";
//Assets
import eyeVisible from "../../assets/img/eye-solid.svg";
import eyeHidden from "../../assets/img/eye-slash-solid.svg";

export default function RoomCodeToggle({ handleClick, roomCodeDisplayed }) {
  const user = useContext(UserContext);

  if (user.role === "admin") {
    return (
      <button className="code-toggle" onClick={() => handleClick()}>
        {roomCodeDisplayed ? (
          <img src={eyeHidden} alt="Hide room code" className="eye-icon" />
        ) : (
          <img src={eyeVisible} alt="Show room code" className="eye-icon" />
        )}
      </button>
    );
  }

  return;
}
