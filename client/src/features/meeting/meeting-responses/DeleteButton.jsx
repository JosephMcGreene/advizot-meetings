import { ReactComponent as TrashCan } from "../../../assets/img/trash-can-solid.svg";

export default function DeleteButton({ signInID, handleDelete }) {
  return (
    <button
      className="delete-btn"
      onClick={() => handleDelete(signInID)}
      tabIndex="0"
    >
      <TrashCan className="delete-icon" />
    </button>
  );
}
