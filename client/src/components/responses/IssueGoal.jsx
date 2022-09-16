import { useState, useContext } from "react";
import { UserContext } from "../../App";
import { UserResponseContext } from "./Response";
//External
import { Formik, Form } from "formik";
import * as Yup from "yup";
//Internal
import InputField from "../form/InputField";
import editPen from "../../img/pen-solid.svg";

export default function IssueGoal({
	title,
	name,
	className,
	text,
	setEditingMode,
	onSubmitEdits,
}) {
	const [isEditing, setIsEditing] = useState(false);
	const currentUser = useContext(UserContext);
	const userResponseBody = useContext(UserResponseContext);

	return (
		<article
			className={className}
			onClick={() => setEditingMode(setIsEditing(true))}
		>
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
				<Formik
					initialValues={{
						[name]: userResponseBody[name],
					}}
					validationSchema={Yup.object({
						[name]: Yup.string(),
					})}
					onSubmit={(values, { setSubmitting }) => {
						try {
							userResponseBody[name] = values[name];
							onSubmitEdits(userResponseBody);
							setSubmitting(false);
							setIsEditing(false);
						} catch (error) {
							console.error(error);
						}
					}}
				>
					{() => (
						<Form>
							<InputField name={name} as="textarea" className="edit-textarea" />

							<button type="submit" className="btn">
								Done
							</button>
						</Form>
					)}
				</Formik>
			) : (
				<>{text}</>
			)}
		</article>
	);
}
