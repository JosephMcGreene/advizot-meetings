import { useState, useRef, useContext } from "react";
import { UserContext } from "../../../App";
//Assets
import formIcon from "../../../assets/img/file-pen-solid.svg";
import lockIcon from "../../../assets/img/lock-open-solid.svg";
//External
//Helpers
import { constructCurrentDate } from "../../../helpers";
//Hooks
import useOutsideClick from "../../../hooks/useOutsideClick";
//Components
import ModalTemplate from "../../modals/ModalTemplate";
import MeetingForm from "../../modals/MeetingForm";

export default function ActionsList({
  displayPasscode,
  onFormSubmit,
  onClose,
}) {
  const user = useContext(UserContext);
  const [formDisplayed, setFormDisplayed] = useState(false);

  const actionsRef = useRef();
  useOutsideClick(actionsRef, () => onClose());

  return (
    <>
      <ul ref={actionsRef} className="actions-list">
        <li className="actions-item">
          <button
            onClick={() => setFormDisplayed(!formDisplayed)}
            className="actions-btn"
          >
            <span className="actions-label">Show Form</span>
            <img src={formIcon} alt="Form" className="actions-list-icon" />
          </button>
        </li>
        {formDisplayed && (
          <ModalTemplate
            title={constructCurrentDate() + " Meeting"}
            onClose={() => setFormDisplayed(false)}
          >
            <MeetingForm
              onSubmit={onFormSubmit}
              onClose={() => setFormDisplayed(false)}
            />
          </ModalTemplate>
        )}

        {user.role === "admin" ? (
          <li className="actions-item">
            <button onClick={() => displayPasscode()} className="actions-btn">
              <span className="actions-label">Show Passcode</span>
              <img src={lockIcon} alt="Key" className="actions-list-icon" />
            </button>
          </li>
        ) : (
          ""
        )}
      </ul>
    </>
  );
}
