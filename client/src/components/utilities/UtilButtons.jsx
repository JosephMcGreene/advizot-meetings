import formIcon from "../../assets/img/align-left-solid.svg";

export default function UtilButtons({ openForm, showForm }) {
  return (
    <ul className="util-list">
      <li className="util-item">
        <button className="btn util-btn" onClick={openForm}>
          <img className="util-icon" src={formIcon} alt="fullscreen eye" />
          <span className="util-text">Show Form</span>
        </button>
      </li>
    </ul>
  );
}
