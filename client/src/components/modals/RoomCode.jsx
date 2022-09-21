//External
import { Formik, Form } from "formik";
import * as Yup from "yup";
//Internal
import InputField from "../form/InputField";
import LoadingSpinner from "../LoadingSpinner";

export default function RoomCode({ onClose }) {
	return (
		<div className="modal">
			<div className="modal-content">
				<div className="modal-header">
					<span>Room Code</span>
					<button className="close-x" onClick={() => onClose()}>
						&times;
					</button>
				</div>

				<div className="modal-body">
					<Formik
						initialValues={{
							passcode: "",
						}}
						validationSchema={Yup.object({
							passcode: Yup.string().required("You must add a valid room code"),
						})}
						onSubmit={(values, actions) => {
							try {
								console.log(`The passcode is ${values.passcode}`);
								actions.setSubmitting(false);
							} catch (error) {
								console.error(error);
							}
						}}
					>
						{({ isSubmitting, ...props }) => (
							<Form>
								<InputField
									text="Please enter today's pass code:"
									name="passcode"
									as="input"
									type="text"
									className="text-input"
								/>

								<button type="submit" className="btn">
									{isSubmitting ? (
										<LoadingSpinner color="black" />
									) : (
										"Enter Meeting"
									)}
								</button>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
}
