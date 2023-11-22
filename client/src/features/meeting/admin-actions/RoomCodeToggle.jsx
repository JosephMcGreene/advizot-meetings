import { useContext } from "react";
import { UserContext } from "../../../App";
//Assets
import eyeVisible from "../../../assets/img/eye-solid.svg";
import eyeHidden from "../../../assets/img/eye-slash-solid.svg";

export default function RoomCodeToggle({ handleClick, roomCodeShown }) {
  const user = useContext(UserContext);

  if (user.role === "admin") {
    return (
      // Styles in _admin-sign-ins.scss contains an ::after that displays the "Room Code" content on hover
      <button className="code-toggle" onClick={() => handleClick()}>
        {roomCodeShown ? (
          <img src={eyeHidden} alt="Hide room code" className="eye-icon" />
        ) : (
          <img src={eyeVisible} alt="Show room code" className="eye-icon" />
        )}
      </button>
    );
  }

  return;
}
