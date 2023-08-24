import verticalEllipse from "../../../assets/img/ellipsis-vertical-solid.svg";

export default function ActionsMenu({ children, actionToggle, className }) {
  return (
    <nav className={className}>
      {children}

      <button className="user-action-btn" onClick={() => actionToggle()}>
        <img src={verticalEllipse} alt="user actions" className="dots-icon" />
      </button>
    </nav>
  );
}
