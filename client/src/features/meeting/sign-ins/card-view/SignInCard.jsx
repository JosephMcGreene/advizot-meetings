//Components
import SignInItem from "./SignInItem";
import DeleteButton from "../DeleteButton";

export default function SignIncard({
  signInBody,
  handleDelete,
  handleSubmitEdits,
  signInBelongsToUser,
}) {
  return (
    <li className="sign-in-li" tabIndex="0">
      <label className="sign-in-name">{signInBody.userName}</label>

      <SignInItem
        title="Priority"
        text={signInBody.priority.substring(1)}
        className="sign-in priority"
        handleSubmitEdits={handleSubmitEdits}
        signInBody={signInBody}
        signInBelongsToUser={signInBelongsToUser}
      />

      {signInBelongsToUser(signInBody) && (
        <DeleteButton signInID={signInBody._id} handleDelete={handleDelete} />
      )}

      <SignInItem
        title="Business"
        text={signInBody.business}
        className="sign-in range-sign-in business-rating"
        handleSubmitEdits={handleSubmitEdits}
        signInBody={signInBody}
        signInBelongsToUser={signInBelongsToUser}
      />

      <SignInItem
        title="Personal"
        text={signInBody.personal}
        className="sign-in range-sign-in personal-rating"
        handleSubmitEdits={handleSubmitEdits}
        signInBody={signInBody}
        signInBelongsToUser={signInBelongsToUser}
      />

      <SignInItem
        title="Relationships"
        text={signInBody.relationships}
        className="sign-in range-sign-in relationships-rating"
        handleSubmitEdits={handleSubmitEdits}
        signInBody={signInBody}
        signInBelongsToUser={signInBelongsToUser}
      />

      <SignInItem
        title="Issue to Process Today"
        text={signInBody.monthlyIssue}
        className="sign-in issue"
        handleSubmitEdits={handleSubmitEdits}
        signInBody={signInBody}
        signInBelongsToUser={signInBelongsToUser}
      />

      <SignInItem
        title="Goal Before Next Meeting"
        text={signInBody.monthlyGoal}
        className="sign-in goal"
        handleSubmitEdits={handleSubmitEdits}
        signInBody={signInBody}
        signInBelongsToUser={signInBelongsToUser}
      />
    </li>
  );
}
