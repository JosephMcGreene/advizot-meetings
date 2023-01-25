import { useContext } from "react";
import { UserResponseContext } from "./user/Response";
import trashCan from "../../assets/img/trash-can-solid.svg";

export default function DeleteButton({ onDelete }) {
  const userResponseBody = useContext(UserResponseContext);

  return (
    <button
      className="delete-icon"
      onClick={() => {
        onDelete(userResponseBody);
      }}
    >
      <img src={trashCan} alt="Delete Response" />
    </button>
  );
}
