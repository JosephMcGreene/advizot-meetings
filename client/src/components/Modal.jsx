//Internal
import InputField from "./InputField";

//External
import { Formik, Form } from "formik";
import * as Yup from "yup";

export default function Modal({ showLogin, onClose, onSubmit }) {
	if (!showLogin) {
		return null;
	}

	return (
		<div className="modal">
			<div className="modal-content">
				<div className="modal-header" onClick={() => onClose()}>
					<span>Login</span>
					<button className="close-x">&times;</button>
				</div>

				<Formik
					initialValues={{
						firstName: "",
						lastName: "",
						coachID: "",
					}}
					validationSchema={Yup.object({
						firstName: Yup.string().required("This is required"),
						lastName: Yup.string().required("This is required"),
						coachID: Yup.number().test(
							"length",
							"5 or 6 digits",
							(val) => val > 10000 && val < 1000000
						),
					})}
					onSubmit={(values, { setSubmitting }) => {
						values.firstName = values.firstName.toLowerCase();
						values.lastName = values.lastName.toLowerCase();
						values.coachID = parseInt(values.coachID);
						onSubmit(values);
						setSubmitting(false);
					}}
				>
					{({ isSubmitting, ...props }) => (
						<Form className="modal-body">
							<InputField
								text="First Name:"
								name="firstName"
								as="input"
								type="input"
								className="personal-info"
								placeholder=""
							/>
							<InputField
								text="Last Name:"
								name="lastName"
								as="input"
								type="input"
								className="personal-info"
								placeholder=""
							/>
							<InputField
								text="Coach Accountable ID:"
								name="coachID"
								as="input"
								type="input"
								className="personal-info"
								placeholder="Get this from Kevin"
							/>
							<button type="submit" className="btn">
								{isSubmitting ? "Logging in..." : "Log in"}
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}
