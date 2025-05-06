export default function DataColumn({ signInBody }) {
  return (
    <>
      <td className="meeting-table-column2">
        <div className="inner-table-row1">
          <p>Business: {signInBody.business}</p>
          <p>Personal: {signInBody.personal}</p>
          <p>Relationships: {signInBody.relationships}</p>
        </div>
        <div className="issue-goal">
          <h4>Issue</h4>
          <p>{signInBody.monthlyIssue}</p>
        </div>
        <div className="issue-goal">
          <h4>Goal</h4>
          <p>{signInBody.monthlyGoal}</p>
        </div>
      </td>
    </>
  );
}
