import { useContext } from "react";
import { UserContext } from "../../../../App";
//Components
import ResponseItem from "./ResponseItem";
import DeleteButton from "../DeleteButton";

export default function MemberResponse({
  responseBody,
  handleDelete,
  handleSubmitEdits,
}) {
  const user = useContext(UserContext);

  /**
   * Assesses whether the current user can in fact edit or delete the response they hover over
   *
   * @returns {boolean} whether or not the user can edit or delete the response
   */
  function isCorrectUser() {
    if (user.advizotID === responseBody?.userID) return true;
    return false;
  }

  return (
    <li className="response-li" tabIndex="0">
      <label className="response-name">{responseBody.userName}</label>

      <ResponseItem
        title="Priority"
        text={responseBody.priority.substring(1)}
        className="response priority"
        handleSubmitEdits={handleSubmitEdits}
        responseBody={responseBody}
        isCorrectUser={isCorrectUser}
      />

      {isCorrectUser() && (
        <DeleteButton
          responseID={responseBody._id}
          handleDelete={handleDelete}
        />
      )}

      <ResponseItem
        title="Business"
        text={responseBody.business}
        className="response range-response business-rating"
        handleSubmitEdits={handleSubmitEdits}
        responseBody={responseBody}
        isCorrectUser={isCorrectUser}
      />

      <ResponseItem
        title="Personal"
        text={responseBody.personal}
        className="response range-response personal-rating"
        handleSubmitEdits={handleSubmitEdits}
        responseBody={responseBody}
        isCorrectUser={isCorrectUser}
      />

      <ResponseItem
        title="Relationships"
        text={responseBody.relationships}
        className="response range-response relationships-rating"
        handleSubmitEdits={handleSubmitEdits}
        responseBody={responseBody}
        isCorrectUser={isCorrectUser}
      />

      <ResponseItem
        title="Issue to Process Today"
        text={responseBody.monthlyIssue}
        className="response issue"
        handleSubmitEdits={handleSubmitEdits}
        responseBody={responseBody}
        isCorrectUser={isCorrectUser}
      />

      <ResponseItem
        title="Goal Before Next Meeting"
        text={responseBody.monthlyGoal}
        className="response goal"
        handleSubmitEdits={handleSubmitEdits}
        responseBody={responseBody}
        isCorrectUser={isCorrectUser}
      />
    </li>
  );
}
