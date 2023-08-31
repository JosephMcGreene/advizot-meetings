import { useState, useRef } from "react";
//Assets
import filterIcon from "../../../assets/img/filter-solid.svg";
import addResponseIcon from "../../../assets/img/file-circle-plus-solid.svg";
//External
import { motion } from "framer-motion";
//Helpers
import { constructCurrentDate } from "../../../helpers";
//Hooks
import useOutsideClick from "../../../hooks/useOutsideClick";
//Components
import ModalTemplate from "../../../shared/modals/ModalTemplate";
import MeetingForm from "../form/MeetingForm";

export default function AdminActionList({
  onFormSubmit,
  actionToggle,
  handleNewResponseClick,
  handleFilterClick,
}) {
  const [formDisplayed, setFormDisplayed] = useState(false);

  const actionsRef = useRef();
  useOutsideClick(actionsRef, () => actionToggle());

  return (
    <motion.ul
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      ref={actionsRef}
      className="admin-actions-list"
    >
      <li className="admin-actions-item">
        <button
          className="admin-actions-btn"
          onClick={() => handleFilterClick()}
        >
          <label className="admin-actions-label">Filter Responses</label>
          <img src={filterIcon} alt="Filter" className="admin-actions-icon" />
        </button>
      </li>

      <li className="admin-actions-item">
        <button
          className="admin-actions-btn"
          onClick={() => handleNewResponseClick()}
        >
          <label className="admin-actions-label">New Response</label>
          <img
            src={addResponseIcon}
            alt="Form"
            className="admin-actions-icon"
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
    </motion.ul>
  );
}
