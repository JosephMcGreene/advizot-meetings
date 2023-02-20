import formIcon from "../../assets/img/file-pen-solid.svg";
import meetingIcon from "../../assets/img/people-group-solid.svg";

export default function ActionsList() {
  return (
    <ul className="actions-list">
      <li className="actions-item">
        <button className="actions-btn" name="meeting-btn">
          <label htmlFor="meeting-btn" className="actions-label">
            New Meeting
          </label>
          <img
            className="actions-list-icon"
            src={meetingIcon}
            alt="group of people"
          />
        </button>
      </li>
      <li className="actions-item">
        <button className="actions-btn" name="form-btn">
          <label htmlFor="form-btn" className="actions-label">
            Show Form
          </label>
          <img className="actions-list-icon" src={formIcon} alt="form" />
        </button>
      </li>
    </ul>
  );
}
