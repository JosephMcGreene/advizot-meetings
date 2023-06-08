import trashCan from "../../../assets/img/trash-can-solid.svg";

export default function DeleteButton({ responseID, onDelete }) {
  return (
    <button
      className="delete-btn"
      onClick={() => onDelete(responseID)}
      tabindex="0"
    >
      <img src={trashCan} alt="Delete Response" className="delete-icon" />
    </button>
  );
}
