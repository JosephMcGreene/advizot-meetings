import { useState } from "react";
import editPen from "../../img/pen-solid.svg";

export default function RatingPriority({
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
		<span className={className} onClick={allowEdit}>
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

			<br />

			{isEditing ? (
				<input
					placeholder="This does nothing right now"
					onKeyPress={(event) => handleEnter(event)}
				/>
			) : (
				<>{text}</>
			)}
		</span>
	);
}
