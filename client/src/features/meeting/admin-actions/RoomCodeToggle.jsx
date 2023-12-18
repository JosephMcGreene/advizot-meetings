import { useContext } from "react";
import { UserContext } from "../../../App";
//Assets
import { ReactComponent as EyeVisible } from "../../../assets/img/eye-solid.svg";
import { ReactComponent as EyeHidden } from "../../../assets/img/eye-slash-solid.svg";

export default function RoomCodeToggle({ handleClick, roomCodeShown }) {
  const user = useContext(UserContext);

  if (user.role === "admin") {
    return (
      // Styles in _admin-sign-ins.scss contains an ::after that displays the "Room Code" content on hover
      <button className="code-toggle" onClick={() => handleClick()}>
        {roomCodeShown ? (
          <EyeHidden className="icon" />
        ) : (
          <EyeVisible className="icon" />
        )}
      </button>
    );
  }

  return;
}
