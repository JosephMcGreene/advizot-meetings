import { useState, useRef, useContext } from "react";
import { UserContext } from "../../../App";
//Assets
import addResponseIcon from "../../../assets/img/file-circle-plus-solid.svg";
import lockIcon from "../../../assets/img/lock-solid.svg";
//External
import { motion } from "framer-motion";
//Helpers
import { constructCurrentDate } from "../../../helpers";
//Hooks
import useOutsideClick from "../../../hooks/useOutsideClick";
//Components
import ModalTemplate from "../../../shared/modals/ModalTemplate";
import MeetingForm from "../form/MeetingForm";

export default function ActionsList({
  displayRoomCode,
  onFormSubmit,
  onClose,
}) {
  const user = useContext(UserContext);
  const [formDisplayed, setFormDisplayed] = useState(false);

  const actionsRef = useRef();
  useOutsideClick(actionsRef, () => onClose());

  return (
    <>
      <motion.ul
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        ref={actionsRef}
        className="actions-list"
      >
        <li className="actions-item" tabindex="1">
          <button
            onClick={() => setFormDisplayed(!formDisplayed)}
            className="actions-btn"
          >
            <span className="actions-label">New Response</span>
            <img
              src={addResponseIcon}
              alt="Form"
              className="actions-list-icon"
            />
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
          <li className="actions-item" tabindex="2">
            <button onClick={() => displayRoomCode()} className="actions-btn">
              <span className="actions-label">Toggle Room Code</span>
              <img src={lockIcon} alt="Key" className="actions-list-icon" />
            </button>
          </li>
        ) : (
          ""
        )}
      </motion.ul>
    </>
  );
}
