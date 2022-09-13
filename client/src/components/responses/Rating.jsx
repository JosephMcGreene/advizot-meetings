import { useState, useContext } from "react";
import { UserContext } from "../../App";
////External
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
////Internal
// import InputField from "../form/InputField";
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
	const currentUser = useContext(UserContext);

	/**
	 * edits the user's response and sends the new data up the component tree
	 * @param {Object} event the event triggering the function
	 */
	// function handleSubmit(event) {
	// 	event.preventDefault();

	// 	let saveResponse = userResponseBody;
	// 	//submit new response:
	// 	saveResponse[title.toLowerCase()] = parseInt(inputValue);
	// 	onSubmit(saveResponse);
	// 	//delete old user response:
	// 	onDelete(userResponseBody);

	// 	setIsEditing();
	// }

	return (
		<span className={className}>
			<strong>
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

			{text}
		</span>
	);
}
