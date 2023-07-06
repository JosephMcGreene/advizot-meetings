import AdminTableCell from "./AdminTableCell";

export default function AdminResponse({ userResponseBody }) {
  return (
    <tr className="admin-response-row">
      <th scope="row">{userResponseBody.userName}</th>

      <AdminTableCell
        userResponse={userResponseBody}
        responseItem={userResponseBody.priority.substring(1)}
      />
      <AdminTableCell
        userResponse={userResponseBody}
        responseItem={userResponseBody.business}
      />
      <AdminTableCell
        userResponse={userResponseBody}
        responseItem={userResponseBody.personal}
      />
      <AdminTableCell
        userResponse={userResponseBody}
        responseItem={userResponseBody.relationships}
      />
      <AdminTableCell
        userResponse={userResponseBody}
        responseItem={userResponseBody.monthlyIssue}
      />
      <AdminTableCell
        userResponse={userResponseBody}
        responseItem={userResponseBody.monthlyGoal}
      />
    </tr>
  );
}
