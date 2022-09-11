import { useContext } from "react";
import { UserContext } from "../../App";
import Rating from "./Rating";
import Priority from "./Priority";
import IssueGoal from "./IssueGoal";
import trashCan from "../../img/trash-can-solid.svg";

export default function Response({ userResponseBody, onSubmit, onDelete }) {
	const currentUser = useContext(UserContext);

	return (
		<li className="response-li">
			<span className="response-name">
				<strong>{userResponseBody.userName}</strong>
			</span>

			<Priority
				title="Priority"
				userResponseBody={userResponseBody}
				currentUser={currentUser}
				className="response-p priority"
				text={userResponseBody.priority.substring(1)}
				onSubmit={onSubmit}
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

			<Rating
				title="Business"
				userResponseBody={userResponseBody}
				currentUser={currentUser}
				className="response-p range-response"
				text={userResponseBody.business}
				onSubmit={onSubmit}
				onDelete={onDelete}
			/>

			<Rating
				title="Personal"
				userResponseBody={userResponseBody}
				currentUser={currentUser}
				className="response-p range-response"
				text={userResponseBody.personal}
				onSubmit={onSubmit}
				onDelete={onDelete}
			/>

			<Rating
				title="Relationships"
				userResponseBody={userResponseBody}
				currentUser={currentUser}
				className="response-p range-response"
				text={userResponseBody.relationships}
				onSubmit={onSubmit}
				onDelete={onDelete}
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
