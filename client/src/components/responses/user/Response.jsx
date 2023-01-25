import { useState, createContext, useContext } from "react";
import { UserContext } from "../../../App";
//Components
import DeleteButton from "../DeleteButton";
import Priority from "../Priority";
import Rating from "../Rating";
import IssueGoal from "../IssueGoal";
//Assets

export const UserResponseContext = createContext();

export default function Response({
  userResponseBody,
  onSubmitEdits,
  onDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const currentUser = useContext(UserContext);

  /**
   * Ensures the correct user is able to edit the resposne
   * @param {func} callback calls setEditing in the appropriate input field
   */
  function setEditingMode(callback) {
    if (
      userResponseBody.userName ===
      `${currentUser.firstName} ${currentUser.lastName}`
    ) {
      callback();
      setIsEditing(!isEditing);
    }
  }

  return (
    <UserResponseContext.Provider value={userResponseBody}>
      <li className="response-li">
        {console.log(currentUser)}
        {/* //TODO Add actual auth here */}
        {/* Only display delete icon to correct user: */}
        {userResponseBody.userName ===
        `${currentUser.firstName} ${currentUser.lastName}` ? (
          <DeleteButton onDelete={onDelete} />
        ) : (
          ""
        )}

        <span className="response-name">
          <strong>{userResponseBody.userName}</strong>
        </span>

        <Priority
          title="Priority"
          text={userResponseBody.priority.substring(1)}
          className="response-p priority"
          setEditingMode={setEditingMode}
          onSubmitEdits={onSubmitEdits}
        />

        <Rating
          title="Business"
          text={userResponseBody.business}
          className="response-p range-response business-rating"
          setEditingMode={setEditingMode}
          onSubmitEdits={onSubmitEdits}
        />

        <Rating
          title="Personal"
          text={userResponseBody.personal}
          className="response-p range-response personal-rating"
          setEditingMode={setEditingMode}
          onSubmitEdits={onSubmitEdits}
        />

        <Rating
          title="Relationships"
          text={userResponseBody.relationships}
          className="response-p range-response relationships-rating"
          setEditingMode={setEditingMode}
          onSubmitEdits={onSubmitEdits}
        />

        <IssueGoal
          title="Issue to Process Today"
          name="monthlyIssue"
          className="response-p issue"
          text={userResponseBody.monthlyIssue}
          setEditingMode={setEditingMode}
          onSubmitEdits={onSubmitEdits}
        />

        <IssueGoal
          title="Goal Before Next Meeting"
          name="monthlyGoal"
          className="response-p goal"
          text={userResponseBody.monthlyGoal}
          setEditingMode={setEditingMode}
          onSubmitEdits={onSubmitEdits}
        />
      </li>
    </UserResponseContext.Provider>
  );
}
