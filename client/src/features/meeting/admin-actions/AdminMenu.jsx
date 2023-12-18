import slidersIcon from "../../../assets/img/ellipsis-vertical-solid.svg";

export default function AdminMenu({ children, actionToggle, className }) {
  return (
    <nav className={className}>
      {children}

      <button
        type="button"
        className="user-action-btn"
        onClick={() => actionToggle()}
      >
        <img src={slidersIcon} alt="user actions" className="dots-icon" />
      </button>
    </nav>
  );
}
