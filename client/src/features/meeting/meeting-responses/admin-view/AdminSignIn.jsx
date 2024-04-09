import { useState } from "react";
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
    <tr
      className="tbody-row"
      onMouseEnter={() => setDeleteBtnShown(true)}
      onMouseLeave={() => setDeleteBtnShown(false)}
    >
      <th className="tbody-th">
        {deleteBtnShown && (
          <DeleteButton signInID={signInBody._id} handleDelete={handleDelete} />
        )}

        <h4 className="admin-row-name">{signInBody.userName}</h4>
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
    </tr>
  );
}
