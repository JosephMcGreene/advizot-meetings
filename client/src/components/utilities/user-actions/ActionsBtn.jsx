import verticalEllipse from "../../assets/img/ellipsis-vertical-solid.svg";

export default function ActionsBtn({ openActions }) {
  return (
    <button onClick={() => openActions()} className="user-action-btn">
      <img src={verticalEllipse} alt="user-actions" className="actions-icon" />
    </button>
  );
}
