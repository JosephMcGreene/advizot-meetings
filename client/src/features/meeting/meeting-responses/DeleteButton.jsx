import trashCan from "../../../assets/img/trash-can-solid.svg";

export default function DeleteButton({ responseID, handleDelete }) {
  return (
    <button
      className="delete-btn"
      onClick={() => handleDelete(responseID)}
      tabIndex="0"
    >
      <img src={trashCan} alt="Delete Response" className="delete-icon" />
    </button>
  );
}
