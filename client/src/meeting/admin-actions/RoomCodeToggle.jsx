import { ReactComponent as EyeHidden } from "../../assets/img/eye-slash-solid.svg";
import { ReactComponent as EyeVisible } from "../../assets/img/eye-solid.svg";

export default function RoomCodeToggle({ roomCodeShown, setRoomCodeShown }) {
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
