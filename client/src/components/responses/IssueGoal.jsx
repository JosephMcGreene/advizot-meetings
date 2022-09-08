import { useState } from "react";
import editPen from "../../img/pen-solid.svg";

export default function IssueGoal({
	title,
	userResponseBody,
	currentUser,
	className,
	text,
}) {
	const [isEditing, setIsEditing] = useState(false);

	function allowEdit() {
		setIsEditing(true);
	}

	function handleEnter(event) {
		event.preventDefault();

		if (event.key === "Enter") {
			setIsEditing(false);
		}
	}

	return (
		<article className={className} onClick={allowEdit}>
			<h4>
				<strong>
					{/* only show edit pen icon on hover to correct user: */}
					{userResponseBody.userName ===
					`${currentUser.firstName} ${currentUser.lastName}` ? (
						<button className="edit-icon">
							<img src={editPen} alt="Edit" className="edit-pen" />
						</button>
					) : (
						""
					)}

					{title}
				</strong>
			</h4>
			<br />

			{isEditing ? (
				<textarea
					onKeyPress={handleEnter}
					placeholder="This does nothing right now."
				></textarea>
			) : (
				<p>{text}</p>
			)}
		</article>
	);
}
