import trashCan from "../../assets/img/trash-can-solid.svg";

export default function DeleteButton() {
  return (
    <button className="delete-btn">
      <img src={trashCan} alt="Delete Response" className="delete-icon" />
    </button>
  );
}
