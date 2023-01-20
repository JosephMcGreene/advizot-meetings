export default function AdminResponse({ userResponseBody }) {
  return (
    <tr className="admin-response-row">
      <td>{userResponseBody.userName}</td>
      <td>{userResponseBody.priority.substring(1)}</td>
      <td>{userResponseBody.business}</td>
      <td>{userResponseBody.personal}</td>
      <td>{userResponseBody.relationships}</td>
      <td>{userResponseBody.monthlyIssue}</td>
      <td>{userResponseBody.monthlyGoal}</td>
    </tr>
  );
}
