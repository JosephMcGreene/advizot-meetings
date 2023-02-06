import formIcon from "../../assets/img/align-left-solid.svg";
import meetingIcon from "../../assets/img/people-group-solid.svg";

export default function UtilButtons({ openForm, generateMeeting }) {
  return (
    <ul className="util-list">
      <li className="util-item">
        <button className="btn util-btn" onClick={() => openForm()}>
          <img className="util-icon" src={formIcon} alt="form" />
          <span className="util-text">Show Form</span>
        </button>
      </li>
      <li className="util-item">
        <button className="btn util-btn" onClick={() => generateMeeting()}>
          <img className="util-icon" src={meetingIcon} alt="group of people" />
          <span className="util-text">Generate Meeting</span>
        </button>
      </li>
    </ul>
  );
}
