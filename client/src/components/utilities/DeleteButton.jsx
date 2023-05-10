import trashCan from "../../assets/img/trash-can-solid.svg";

export default function DeleteButton({ onDelete }) {
  return (
    <button className="delete-icon">
      <img src={trashCan} alt="Delete Response" />
    </button>
  );
}
