import { useState } from "react";
import editPen from "../../../assets/img/pen-solid.svg";

export default function AdminResponse({ userResponseBody }) {
  return (
    <tr className="admin-response-row">
      <th scope="row">{userResponseBody.userName}</th>
      <AdminTableCell
        responseElement={userResponseBody.priority.substring(1)}
      />
      <AdminTableCell responseElement={userResponseBody.business} />
      <AdminTableCell responseElement={userResponseBody.personal} />
      <AdminTableCell responseElement={userResponseBody.relationships} />
      <AdminTableCell responseElement={userResponseBody.monthlyIssue} />
      <AdminTableCell responseElement={userResponseBody.monthlyGoal} />
    </tr>
  );
}

function AdminTableCell({ responseElement }) {
  const [editPenShown, setEditPenShown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (!isEditing) {
    return (
      <td
        onMouseEnter={() => setEditPenShown(true)}
        onMouseLeave={() => setEditPenShown(false)}
        onClick={() => setIsEditing(true)}
        className="admin-table-cell"
      >
        {responseElement}
        {editPenShown && <img src={editPen} alt="pen" className="edit-pen" />}
      </td>
    );
  }

  // if (isEditing) {
  //   return (

  //   );
  // }
}
