import { useState } from "react";
//External
import { motion } from "framer-motion";
//Components
import AdminTableCell from "./AdminTableCell";
import DeleteButton from "./DeleteButton";

export default function AdminResponse({ userResponseBody }) {
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
      />
      <AdminTableCell
        userResponseBody={userResponseBody}
        responseItem={userResponseBody.business}
      />
      <AdminTableCell
        userResponseBody={userResponseBody}
        responseItem={userResponseBody.personal}
      />
      <AdminTableCell
        userResponseBody={userResponseBody}
        responseItem={userResponseBody.relationships}
      />
      <AdminTableCell
        userResponseBody={userResponseBody}
        responseItem={userResponseBody.monthlyIssue}
      />
      <AdminTableCell
        userResponseBody={userResponseBody}
        responseItem={userResponseBody.monthlyGoal}
      />
    </motion.article>
  );
}
