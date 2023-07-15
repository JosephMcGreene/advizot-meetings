import { useState } from "react";
//Components
import AdminTableCell from "./AdminTableCell";
import DeleteButton from "./DeleteButton";

export default function AdminResponse({ userResponseBody }) {
  const [deleteBtnShown, setDeleteBtnShown] = useState(false);

  return (
    <tr
      className="admin-response-row"
      onMouseEnter={() => setDeleteBtnShown(true)}
      onMouseLeave={() => setDeleteBtnShown(false)}
    >
      <th scope="row" className="admin-row-th">
        {deleteBtnShown && <DeleteButton responseID={userResponseBody._id} />}
        {userResponseBody.userName}
      </th>

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
    </tr>
  );
}
