import { useState, useContext } from "react";
import { UserContext } from "../../App";
import editPen from "../../img/pen-solid.svg";

export default function Priority({ title, userResponseBody, className, text }) {
	const [isEditing, setIsEditing] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const currentUser = useContext(UserContext);

	function handleSubmit(event) {
		console.log(inputValue);
		return setIsEditing(false);
	}

	return (
		<span className={className} onClick={() => setIsEditing(true)}>
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
				<form onSubmit={handleSubmit}>
					<select
						className="edit-response"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					>
						<option value="aA">A</option>
						<option value="bB">B</option>
						<option value="cQuestion">Question</option>
						<option value="dLightning">Lightning</option>
						<option value="eC">C</option>
					</select>
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
