//Internal
import InputField from "./InputField";

//External
import { Formik, Form } from "formik";
import * as Yup from "yup";

export default function Modal({ showModal, onClose, onSubmit }) {
	if (!showModal) {
		return null;
	}

	return (
		<div className="modal">
			<div className="modal-content">
				<div className="modal-header" onClick={() => onClose()}>
					<button className="close-x">&times;</button>
				</div>

				<Formik
					initialValues={{
						name: "",
						coachID: 0,
					}}
					validationSchema={Yup.object({
						name: Yup.string().required("Name is required"),
						coachID: Yup.number().required("This is, like, really important"),
					})}
					onSubmit={(values, { setSubmitting }) => {
						onSubmit(values);
						setSubmitting(false);
					}}
				>
					{({ isSubmitting, ...props }) => (
						<Form className="form modal-body">
							<InputField
								text="Name:"
								name="name"
								as="input"
								type="input"
								className="personal-info"
							/>
							<button type="submit" className="btn" onClick={() => onClose()}>
								{isSubmitting ? "Logging in..." : "Log in"}
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}
