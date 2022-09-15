import React, { useContext } from "react";
import { UserContext } from "../../App";
import Priority from "./Priority";
import Rating from "./Rating";
import IssueGoal from "./IssueGoal";
import trashCan from "../../img/trash-can-solid.svg";

export const UserResponseContext = React.createContext();

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
		<UserResponseContext.Provider value={userResponseBody}>
			<li className="response-li">
				<span className="response-name">
					<strong>{userResponseBody.userName}</strong>
				</span>

				<Priority
					title="Priority"
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
					className="response-p range-response"
					text={userResponseBody.business}
					setEditingMode={setEditingMode}
					onSubmitEdits={onSubmitEdits}
				/>

				<Rating
					title="Personal"
					className="response-p range-response"
					text={userResponseBody.personal}
					setEditingMode={setEditingMode}
					onSubmitEdits={onSubmitEdits}
				/>

				<Rating
					title="Relationships"
					className="response-p range-response"
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
