import { useState, useContext } from "react";
import { UserContext } from "../../App";
//External
import { Formik, Form } from "formik";
import * as Yup from "yup";
//Internal
import InputField from "../form/InputField";
import editPen from "../../img/pen-solid.svg";

export default function Rating({
	title,
	userResponseBody,
	className,
	text,
	setEditingMode,
	onSubmitEdits,
}) {
	const [isEditing, setIsEditing] = useState(false);
	const currentUser = useContext(UserContext);

	return (
		<span
			className={className}
			onClick={() => setEditingMode(setIsEditing(true))}
		>
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
				<Formik
					initialValues={{
						[title.toLowerCase()]: userResponseBody[title.toLowerCase()],
					}}
					validationSchema={Yup.object({
						[title.toLowerCase()]: Yup.number(),
					})}
					onSubmit={(values, { setSubmitting }) => {
						try {
							userResponseBody[title.toLowerCase()] =
								values[title.toLowerCase()];
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
							<InputField
								name={title.toLowerCase()}
								as="input"
								type="number"
								min={1}
								max={10}
							/>

							<button type="submit" className="btn">
								Done
							</button>
						</Form>
					)}
				</Formik>
			) : (
				<>{text}</>
			)}
		</span>
	);
}
