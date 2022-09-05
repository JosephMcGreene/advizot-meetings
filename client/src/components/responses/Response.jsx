import editPencil from "../../img/pen-to-square-solid.svg";
import trashCan from "../../img/trash-can-solid.svg";

export default function Response({ userResponseBody, currentUser, onDelete }) {
	return (
		<li className="response-li">
			<span className="response-name">
				<strong>{userResponseBody.userName}</strong>
			</span>

			<span className="response-p priority">
				<strong>Priority:</strong> {userResponseBody.priority.substring(1)}
			</span>

			{/* Only display edit tools to appropriate user: */}
			{userResponseBody.userName ===
			`${currentUser.firstName} ${currentUser.lastName}` ? (
				<div className="response-edits">
					<button className="edit-icon">
						<img src={editPencil} alt="Edit Response" className="edit-pencil" />
					</button>
					<button
						className="delete-icon"
						onClick={() => onDelete(userResponseBody)}
					>
						<img src={trashCan} alt="Delete Response" className="trash-can" />
					</button>
				</div>
			) : (
				""
			)}

			<span className="response-p range-response">
				<strong>Business</strong>
				<br />
				{userResponseBody.business}
			</span>

			<span className="response-p range-response">
				<strong>Personal</strong>
				<br />
				{userResponseBody.personal}
			</span>

			<span className="response-p range-response">
				<strong>Relationships</strong>
				<br />
				{userResponseBody.relationships}
			</span>

			<article className="response-p issue">
				<h4>
					<strong>Today's Issue</strong>
				</h4>
				<br />
				<p>{userResponseBody.monthlyIssue}</p>
			</article>

			<article className="response-p goal">
				<h4>
					<strong>Goal Before Next Meeting</strong>
				</h4>
				<br />
				<p>{userResponseBody.monthlyGoal}</p>
			</article>
		</li>
	);
}
