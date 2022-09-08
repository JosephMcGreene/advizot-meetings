import RatingPriority from "./RatingPriority";
import trashCan from "../../img/trash-can-solid.svg";
import IssueGoal from "./IssueGoal";

export default function Response({ userResponseBody, currentUser, onDelete }) {
	return (
		<li className="response-li">
			<span className="response-name">
				<strong>{userResponseBody.userName}</strong>
			</span>

			<RatingPriority
				title="Priority"
				userResponseBody={userResponseBody}
				currentUser={currentUser}
				className="response-p priority"
				text={userResponseBody.priority.substring(1)}
			/>

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

			<RatingPriority
				title="Business"
				userResponseBody={userResponseBody}
				currentUser={currentUser}
				className="response-p range-response"
				text={userResponseBody.business}
			/>

			<RatingPriority
				title="Personal"
				userResponseBody={userResponseBody}
				currentUser={currentUser}
				className="response-p range-response"
				text={userResponseBody.personal}
			/>

			<RatingPriority
				title="Relationships"
				userResponseBody={userResponseBody}
				currentUser={currentUser}
				className="response-p range-response"
				text={userResponseBody.relationships}
			/>

			<IssueGoal
				title="Today's Issue"
				userResponseBody={userResponseBody}
				currentUser={currentUser}
				className="response-p issue"
				text={userResponseBody.monthlyIssue}
			/>

			<IssueGoal
				title="Goal Before Next Meeting"
				userResponseBody={userResponseBody}
				currentUser={currentUser}
				className="response-p goal"
				text={userResponseBody.monthlyGoal}
			/>
		</li>
	);
}
