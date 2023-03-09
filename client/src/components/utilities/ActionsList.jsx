import { useState } from "react";
//Internal
import { constructCurrentDate } from "../../helpers";
//Assets
import formIcon from "../../assets/img/file-pen-solid.svg";
//Components
import ModalTemplate from "../modals/ModalTemplate";
import MeetingForm from "../modals/form/MeetingForm";

export default function ActionsList({ onFormSubmit }) {
  const [formDisplayed, seFormDisplayed] = useState(false);

  return (
    <ul className="actions-list">
      <li className="actions-item">
        <button
          onClick={() => seFormDisplayed(!formDisplayed)}
          className="actions-btn"
        >
          <span className="actions-label">Show Form</span>
          <img className="actions-list-icon" src={formIcon} alt="Form" />
        </button>
      </li>
      {formDisplayed && (
        <ModalTemplate
          title={constructCurrentDate() + " Meeting"}
          onClose={() => seFormDisplayed(false)}
        >
          <MeetingForm
            onSubmit={onFormSubmit}
            onClose={() => seFormDisplayed(false)}
          />
        </ModalTemplate>
      )}
    </ul>
  );
}
