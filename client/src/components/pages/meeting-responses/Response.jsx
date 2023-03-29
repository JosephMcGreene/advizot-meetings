import { createContext } from "react";
//Components
import RatingOrPriority from "./RatingOrPriority";
import IssueGoal from "./IssueGoal";

export const UserResponseContext = createContext();

export default function Response({ userResponseBody }) {
  return (
    <UserResponseContext.Provider value={userResponseBody}>
      <li className="response-li">
        <label className="response-name">{userResponseBody.userName}</label>

        <RatingOrPriority
          title="Priority"
          text={userResponseBody.priority.substring(1)}
          className="response-p priority"
        />

        <RatingOrPriority
          title="Business"
          text={userResponseBody.business}
          className="response-p range-response business-rating"
        />

        <RatingOrPriority
          title="Personal"
          text={userResponseBody.personal}
          className="response-p range-response personal-rating"
        />

        <RatingOrPriority
          title="Relationships"
          text={userResponseBody.relationships}
          className="response-p range-response relationships-rating"
        />

        <IssueGoal
          title="Issue to Process Today"
          name="monthlyIssue"
          className="response-p issue"
          text={userResponseBody.monthlyIssue}
        />

        <IssueGoal
          title="Goal Before Next Meeting"
          name="monthlyGoal"
          className="response-p goal"
          text={userResponseBody.monthlyGoal}
        />
      </li>
    </UserResponseContext.Provider>
  );
}