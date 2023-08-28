import { useContext } from "react";
import { UserContext } from "../../../App";
//Components
import ResponseItem from "./ResponseItem";
import DeleteButton from "./DeleteButton";

export default function Response({ responseBody, onDelete, submitEdits }) {
  const user = useContext(UserContext);

  /**
   * A container function for an expression to trim down and simplify the JSX. Assesses whether the current user can in fact edit or delete the response they hover over
   *
   * @returns {boolean} whether or not the user can edit or delete the response the response
   */
  const isCorrectUser = () => {
    if (user.advizotID === responseBody?.userID) return true;
    return false;
  };

  return (
    <li className="response-li" tabIndex="0">
      <label className="response-name">{responseBody.userName}</label>

      <ResponseItem
        title="Priority"
        text={responseBody.priority.substring(1)}
        className="response-p priority"
        submitEdits={submitEdits}
        responseBody={responseBody}
        isCorrectUser={isCorrectUser}
      />

      {isCorrectUser() && (
        <DeleteButton responseID={responseBody._id} onDelete={onDelete} />
      )}

      <ResponseItem
        title="Business"
        text={responseBody.business}
        className="response-p range-response business-rating"
        submitEdits={submitEdits}
        responseBody={responseBody}
        isCorrectUser={isCorrectUser}
      />

      <ResponseItem
        title="Personal"
        text={responseBody.personal}
        className="response-p range-response personal-rating"
        submitEdits={submitEdits}
        responseBody={responseBody}
        isCorrectUser={isCorrectUser}
      />

      <ResponseItem
        title="Relationships"
        text={responseBody.relationships}
        className="response-p range-response relationships-rating"
        submitEdits={submitEdits}
        responseBody={responseBody}
        isCorrectUser={isCorrectUser}
      />

      <ResponseItem
        title="Issue to Process Today"
        text={responseBody.monthlyIssue}
        className="response-p issue"
        submitEdits={submitEdits}
        responseBody={responseBody}
        isCorrectUser={isCorrectUser}
      />

      <ResponseItem
        title="Goal Before Next Meeting"
        text={responseBody.monthlyGoal}
        className="response-p goal"
        submitEdits={submitEdits}
        responseBody={responseBody}
        isCorrectUser={isCorrectUser}
      />
    </li>
  );
}
