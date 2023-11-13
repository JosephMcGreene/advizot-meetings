import trashCan from "../../../assets/img/trash-can-solid.svg";

export default function DeleteButton({ signInID, handleDelete }) {
  return (
    <button
      className="delete-btn"
      onClick={() => handleDelete(signInID)}
      tabIndex="0"
    >
      <img src={trashCan} alt="Delete Sign-In" className="delete-icon" />
    </button>
  );
}
