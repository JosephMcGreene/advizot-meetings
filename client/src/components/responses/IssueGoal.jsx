import { useState, useContext } from "react";
import { UserContext } from "../../App";
import editPen from "../../img/pen-solid.svg";

export default function IssueGoal({
	title,
	userResponseBody,
	className,
	text,
}) {
	// const [isEditing, setIsEditing] = useState(false);
	const currentUser = useContext(UserContext);

	return (
		<article className={className}>
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

			{/* {isEditing ? (
				<form>
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
			)} */}
			{text}
		</article>
	);
}
