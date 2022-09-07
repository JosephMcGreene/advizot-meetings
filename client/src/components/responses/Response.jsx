import ResponseDetail from "./ResponseDetail";
import trashCan from "../../img/trash-can-solid.svg";

export default function Response({ userResponseBody, currentUser, onDelete }) {
	return (
		<li className="response-li">
			<span className="response-name">
				<strong>{userResponseBody.userName}</strong>
			</span>

			<ResponseDetail
				text="Priority"
				userResponseBody={userResponseBody}
				currentUser={currentUser}
				className="response-p priority"
				inputValue={userResponseBody.priority.substring(1)}
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

			<ResponseDetail
				text="Business"
				userResponseBody={userResponseBody}
				currentUser={currentUser}
				className="response-p range-response business"
				inputValue={userResponseBody.business}
			/>

			<ResponseDetail
				text="Personal"
				userResponseBody={userResponseBody}
				currentUser={currentUser}
				className="response-p range-response personal"
				inputValue={userResponseBody.personal}
			/>

			<ResponseDetail
				text="Relationships"
				userResponseBody={userResponseBody}
				currentUser={currentUser}
				className="response-p range-response relationships"
				inputValue={userResponseBody.relationships}
			/>

			<ResponseDetail
				text="Today's Issue"
				userResponseBody={userResponseBody}
				currentUser={currentUser}
				className="response-p issue"
				inputValue={userResponseBody.monthlyIssue}
			/>

			<ResponseDetail
				text="Goal Before Next Meeting"
				userResponseBody={userResponseBody}
				currentUser={currentUser}
				className="response-p goal"
				inputValue={userResponseBody.monthlyGoal}
			/>
		</li>
	);
}
