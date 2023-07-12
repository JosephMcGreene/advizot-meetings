import AdminTableCell from "./AdminTableCell";

export default function AdminResponse({ userResponseBody }) {
  return (
    <tr className="admin-response-row">
      <th scope="row">{userResponseBody.userName}</th>

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
