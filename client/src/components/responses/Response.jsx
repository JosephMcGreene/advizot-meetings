import { useContext } from "react";
import { UserContext } from "../../App";
import Rating from "./Rating";
import Priority from "./Priority";
import IssueGoal from "./IssueGoal";
import trashCan from "../../img/trash-can-solid.svg";

export default function Response({
	userResponseBody,
	onSubmitEdits,
	onDelete,
}) {
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
		}
	}

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
				setEditingMode={setEditingMode}
				onSubmitEdits={onSubmitEdits}
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
				setEditingMode={setEditingMode}
				onSubmitEdits={onSubmitEdits}
			/>

			<Rating
				title="Personal"
				userResponseBody={userResponseBody}
				currentUser={currentUser}
				className="response-p range-response"
				text={userResponseBody.personal}
				setEditingMode={setEditingMode}
				onSubmitEdits={onSubmitEdits}
			/>

			<Rating
				title="Relationships"
				userResponseBody={userResponseBody}
				currentUser={currentUser}
				className="response-p range-response"
				text={userResponseBody.relationships}
				setEditingMode={setEditingMode}
				onSubmitEdits={onSubmitEdits}
			/>

			<IssueGoal
				title="Issue to Process Today"
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
