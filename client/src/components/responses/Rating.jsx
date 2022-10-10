import { useState, useContext } from "react";
import { UserContext } from "../../App";
import { UserResponseContext } from "./Response";
//External
import { Formik, Form } from "formik";
import * as Yup from "yup";
//Components
import InputField from "../form/InputField";
//Assets
import editPen from "../../assets/img/pen-solid.svg";

export default function Rating({
	title,
	className,
	text,
	setEditingMode,
	onSubmitEdits,
}) {
	const [isEditing, setIsEditing] = useState(false);
	const currentUser = useContext(UserContext);
	const userResponseBody = useContext(UserResponseContext);
	const name = title.toLowerCase();

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
						[name]: userResponseBody[name],
					}}
					validationSchema={Yup.object({
						[name]: Yup.number(),
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
							<InputField
								name={name}
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
