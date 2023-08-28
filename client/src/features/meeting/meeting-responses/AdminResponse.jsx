import { useState } from "react";
//External
import { motion } from "framer-motion";
//Components
import AdminTableCell from "./AdminTableCell";
import DeleteButton from "./DeleteButton";

export default function AdminResponse({ responseBody, submitEdits, onDelete }) {
  const [deleteBtnShown, setDeleteBtnShown] = useState(false);

  return (
    <motion.article
      layout
      transition={{ type: "tween", stiffness: 10, duration: 0.1 }}
      className="admin-response-row"
      onMouseEnter={() => setDeleteBtnShown(true)}
      onMouseLeave={() => setDeleteBtnShown(false)}
    >
      <span className="admin-info-cell">
        {deleteBtnShown && (
          <DeleteButton responseID={responseBody._id} onDelete={onDelete} />
        )}

        <motion.h4
          layout
          transition={{ type: "tween", stiffness: 10, duration: 0.1 }}
          className="admin-row-name"
        >
          {responseBody.userName}
        </motion.h4>
      </span>

      <AdminTableCell
        responseBody={responseBody}
        responseItem={responseBody.priority.substring(1)}
        submitEdits={submitEdits}
      />
      <AdminTableCell
        responseBody={responseBody}
        responseItem={responseBody.business}
        submitEdits={submitEdits}
      />
      <AdminTableCell
        responseBody={responseBody}
        responseItem={responseBody.personal}
        submitEdits={submitEdits}
      />
      <AdminTableCell
        responseBody={responseBody}
        responseItem={responseBody.relationships}
        submitEdits={submitEdits}
      />
      <AdminTableCell
        responseBody={responseBody}
        responseItem={responseBody.monthlyIssue}
        submitEdits={submitEdits}
      />
      <AdminTableCell
        responseBody={responseBody}
        responseItem={responseBody.monthlyGoal}
        submitEdits={submitEdits}
      />
    </motion.article>
  );
}
