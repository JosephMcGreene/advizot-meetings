import { useState, useContext } from "react";
import { UserContext } from "../../App";
import editPen from "../../img/pen-solid.svg";

export default function IssueGoal({
	title,
	userResponseBody,
	className,
	text,
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const currentUser = useContext(UserContext);

	function handleSubmit(event) {
		console.log(inputValue);
		return setIsEditing(false);
	}

	return (
		<article className={className} onClick={() => setIsEditing(true)}>
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
				<form onSubmit={handleSubmit}>
					<textarea
						className="edit-response"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					></textarea>
					<button type="submit" className="btn">
						Done
					</button>
				</form>
			) : (
				<p>{text}</p>
			)}
		</article>
	);
}
