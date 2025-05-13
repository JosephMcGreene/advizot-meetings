export default function DataColumn({ signInBody }) {
  return (
    <article className="sign-in-data-col">
      <div className="number-row">
        <div className="number-container">
          <h3 className="label">Business:</h3>
          <p>{signInBody.business}</p>
        </div>

        <div className="number-container">
          <h3 className="label">Personal:</h3>
          <p>{signInBody.personal}</p>
        </div>

        <div className="number-container">
          <h3 className="label">Relationships:</h3>
          <p>{signInBody.relationships}</p>
        </div>
      </div>

      <div className="issue-goal-row">
        <h3>Issue</h3>
        <p>{signInBody.monthlyIssue}</p>
      </div>

      <div className="issue-goal-row">
        <h3>Goal</h3>
        <p>{signInBody.monthlyGoal}</p>
      </div>
    </article>
  );
}
