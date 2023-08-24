import { useState } from "react";
//External
import { motion } from "framer-motion";
//Components
import AdminTableCell from "./AdminTableCell";
import DeleteButton from "./DeleteButton";

export default function AdminResponse({ userResponseBody, submitEdits }) {
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
        {deleteBtnShown && <DeleteButton responseID={userResponseBody._id} />}
        <motion.h4
          layout
          transition={{ type: "tween", stiffness: 10, duration: 0.1 }}
          className="admin-row-name"
        >
          {userResponseBody.userName}
        </motion.h4>
      </span>

      <AdminTableCell
        userResponseBody={userResponseBody}
        responseItem={userResponseBody.priority.substring(1)}
        submitEdits={submitEdits}
      />
      <AdminTableCell
        userResponseBody={userResponseBody}
        responseItem={userResponseBody.business}
        submitEdits={submitEdits}
      />
      <AdminTableCell
        userResponseBody={userResponseBody}
        responseItem={userResponseBody.personal}
        submitEdits={submitEdits}
      />
      <AdminTableCell
        userResponseBody={userResponseBody}
        responseItem={userResponseBody.relationships}
        submitEdits={submitEdits}
      />
      <AdminTableCell
        userResponseBody={userResponseBody}
        responseItem={userResponseBody.monthlyIssue}
        submitEdits={submitEdits}
      />
      <AdminTableCell
        userResponseBody={userResponseBody}
        responseItem={userResponseBody.monthlyGoal}
        submitEdits={submitEdits}
      />
    </motion.article>
  );
}
