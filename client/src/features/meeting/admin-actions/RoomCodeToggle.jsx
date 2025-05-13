import { useContext } from "react";
import { UserContext } from "../../../App";
// Assets
import { ReactComponent as EyeVisible } from "../../../assets/img/eye-solid.svg";
import { ReactComponent as EyeHidden } from "../../../assets/img/eye-slash-solid.svg";

export default function RoomCodeToggle({ setRoomCodeShown, roomCodeShown }) {
  const user = useContext(UserContext);

  return (
    <button
      className="code-toggle"
      onClick={() => setRoomCodeShown(!roomCodeShown)}
    >
      {roomCodeShown ? (
        <EyeHidden className="icon" />
      ) : (
        <EyeVisible className="icon" />
      )}
    </button>
  );
}
