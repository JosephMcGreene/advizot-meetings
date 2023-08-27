//Components
import RatingOrPriority from "./RatingOrPriority";
import DeleteButton from "./DeleteButton";
import IssueGoal from "./IssueGoal";

export default function Response({ userResponseBody, onDelete, submitEdits }) {
  return (
    <li className="response-li" tabIndex="0">
      <label className="response-name">{userResponseBody.userName}</label>

      <RatingOrPriority
        title="Priority"
        text={userResponseBody.priority.substring(1)}
        className="response-p priority"
      />

      <DeleteButton responseID={userResponseBody._id} onDelete={onDelete} />

      <RatingOrPriority
        title="Business"
        text={userResponseBody.business}
        className="response-p range-response business-rating"
        submitEdits={submitEdits}
        userResponseBody={userResponseBody}
      />

      <RatingOrPriority
        title="Personal"
        text={userResponseBody.personal}
        className="response-p range-response personal-rating"
        submitEdits={submitEdits}
        userResponseBody={userResponseBody}
      />

      <RatingOrPriority
        title="Relationships"
        text={userResponseBody.relationships}
        className="response-p range-response relationships-rating"
        submitEdits={submitEdits}
        userResponseBody={userResponseBody}
      />

      <IssueGoal
        title="Issue to Process Today"
        text={userResponseBody.monthlyIssue}
        className="response-p issue"
        submitEdits={submitEdits}
        userResponseBody={userResponseBody}
      />

      <IssueGoal
        title="Goal Before Next Meeting"
        text={userResponseBody.monthlyGoal}
        className="response-p goal"
        submitEdits={submitEdits}
        userResponseBody={userResponseBody}
      />
    </li>
  );
}
