import { useState, createContext, useContext } from "react";
import { UserContext } from "../../App";
//Components
import Priority from "./Priority";
import Rating from "./Rating";
import IssueGoal from "./IssueGoal";
//Assets
import trashCan from "../../assets/img/trash-can-solid.svg";

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
        <span className="response-name">
          <strong>{userResponseBody.userName}</strong>
        </span>

        {/* Only display delete icon to correct user: */}
        {userResponseBody.userName ===
        `${currentUser.firstName} ${currentUser.lastName}` ? (
          <button
            className="delete-icon"
            onClick={() => onDelete(userResponseBody)}
          >
            <img src={trashCan} alt="Delete Response" className="trash-can" />
          </button>
        ) : (
          ""
        )}

        <Priority
          title="Priority"
          text={userResponseBody.priority.substring(1)}
          setEditingMode={setEditingMode}
          onSubmitEdits={onSubmitEdits}
        />

        <Rating
          title="Business"
          text={userResponseBody.business}
          setEditingMode={setEditingMode}
          onSubmitEdits={onSubmitEdits}
        />

        <Rating
          title="Personal"
          text={userResponseBody.personal}
          setEditingMode={setEditingMode}
          onSubmitEdits={onSubmitEdits}
        />

        <Rating
          title="Relationships"
          text={userResponseBody.relationships}
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
