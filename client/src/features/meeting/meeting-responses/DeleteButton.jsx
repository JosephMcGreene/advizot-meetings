import trashCan from "../../../assets/img/trash-can-solid.svg";
//Hooks
import useResponses from "../../../hooks/useResponses";

export default function DeleteButton({ responseID }) {
  const [visibleResponses, loading, error, submitResponse, deleteResponse] =
    useResponses();

  return (
    <button
      className="delete-btn"
      onClick={() => deleteResponse(responseID)}
      tabIndex="0"
    >
      <img src={trashCan} alt="Delete Response" className="delete-icon" />
    </button>
  );
}
