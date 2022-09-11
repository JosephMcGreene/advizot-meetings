import { useState, useContext } from "react";
import { UserContext } from "../../App";
import editPen from "../../img/pen-solid.svg";

export default function Rating({
	title,
	userResponseBody,
	className,
	text,
	onSubmit,
	onDelete,
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const currentUser = useContext(UserContext);

	/**
	 * edits the user's response and sends the new data up the component tree
	 * @param {Object} event the event triggering the function
	 */
	function handleSubmit(event) {
		event.preventDefault();

		let saveResponse = userResponseBody;
		//submit new response:
		saveResponse[title.toLowerCase()] = parseInt(inputValue);
		onSubmit(saveResponse);
		//delete old user response:
		onDelete(userResponseBody);

		setIsEditing(false);
	}

	return (
		<span className={className} onClick={() => setIsEditing(true)}>
			<strong>
				{/* only show edit pen icon on hover and to correct user: */}
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
				<form onSubmit={handleSubmit}>
					<input
						type="number"
						min="1"
						max="10"
						className="edit-response"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>
					<button type="submit" className="btn">
						Done
					</button>
				</form>
			) : (
				<>{text}</>
			)}
		</span>
	);
}
