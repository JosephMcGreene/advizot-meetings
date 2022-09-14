import { useState, useContext } from "react";
import { UserContext } from "../../App";
//External
import { Formik, Form } from "formik";
import * as Yup from "yup";
//Internal
import Select from "../form/Select";
import editPen from "../../img/pen-solid.svg";

export default function Priority({
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
						priorty: userResponseBody.priority,
					}}
					validationSchema={Yup.object({
						priority: Yup.string().required("Make Selection"),
					})}
					onSubmit={(values, { setSubmitting }) => {
						try {
							userResponseBody.priority = values.priority;
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
							<Select name="priority" className="priority">
								<option>Select</option>
								<option value="aA">A</option>
								<option value="bB">B</option>
								<option value="cQuestion">Question</option>
								<option value="dLightning">Lightning</option>
								<option value="eC">C</option>
							</Select>

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
