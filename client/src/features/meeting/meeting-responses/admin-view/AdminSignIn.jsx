import { useState } from "react";
//External
import { motion } from "framer-motion";
//Components
import AdminTableCell from "./AdminTableCell";
import DeleteButton from "../DeleteButton";

export default function AdminSignIn({
  signInBody,
  handleSubmitEdits,
  handleDelete,
}) {
  const [deleteBtnShown, setDeleteBtnShown] = useState(false);

  return (
    <motion.tr
      layout
      transition={{ type: "tween", stiffness: 10, duration: 0.1 }}
      className="admin-sign-in-row"
      onMouseEnter={() => setDeleteBtnShown(true)}
      onMouseLeave={() => setDeleteBtnShown(false)}
    >
      <th className="admin-info-cell">
        {deleteBtnShown && (
          <DeleteButton signInID={signInBody._id} handleDelete={handleDelete} />
        )}

        <motion.h4
          layout
          transition={{ type: "tween", stiffness: 10, duration: 0.1 }}
          className="admin-row-name"
        >
          {signInBody.userName}
        </motion.h4>
      </th>

      <AdminTableCell
        signInBody={signInBody}
        signInItem={signInBody.priority.substring(1)}
        handleSubmitEdits={handleSubmitEdits}
      />
      <AdminTableCell
        signInBody={signInBody}
        signInItem={signInBody.business}
        handleSubmitEdits={handleSubmitEdits}
      />
      <AdminTableCell
        signInBody={signInBody}
        signInItem={signInBody.personal}
        handleSubmitEdits={handleSubmitEdits}
      />
      <AdminTableCell
        signInBody={signInBody}
        signInItem={signInBody.relationships}
        handleSubmitEdits={handleSubmitEdits}
      />
      <AdminTableCell
        signInBody={signInBody}
        signInItem={signInBody.monthlyIssue}
        handleSubmitEdits={handleSubmitEdits}
      />
      <AdminTableCell
        signInBody={signInBody}
        signInItem={signInBody.monthlyGoal}
        handleSubmitEdits={handleSubmitEdits}
      />
    </motion.tr>
  );
}
