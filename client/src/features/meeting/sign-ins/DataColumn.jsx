export default function DataColumn({ signInBody }) {
  return (
    <article className="sign-in-data-col">
      <div className="number-row">
        <div className="number-container">
          <label htmlFor="business">Business:</label>
          <p id="business">{signInBody.business}</p>
        </div>
        <div className="number-container">
          <label htmlFor="personal">Personal:</label>
          <p id="personal">{signInBody.personal}</p>
        </div>
        <div className="number-container">
          <label htmlFor="relationships">Relationships:</label>
          <p id="relationships">{signInBody.relationships}</p>
        </div>
      </div>

      <div className="issue-goal-row">
        <h4>Issue</h4>
        <p>{signInBody.monthlyIssue}</p>
      </div>
      <div className="issue-goal-row">
        <h4>Goal</h4>
        <p>{signInBody.monthlyGoal}</p>
      </div>
    </article>
  );
}
