//External
import { Formik, Form } from "formik";
import * as Yup from "yup";
//Helpers
import { constructDate } from "../../helpers";
//Components
import InputField from "./InputField";
import Select from "./Select";
import LoadingSpinner from "../LoadingSpinner";

export default function MeetingForm({ onSubmit }) {
	/**
	 * Calculates how much of an input slider's background should be filled up based on where the user is sliding it
	 * @param {Number} value The current value of the range-slider, used as a basis to calculate how much of the background of the slider needs to be turned orange
	 * @returns {Object} A styles object specifying the percentage of the background should be orange.
	 */
	function getSliderSize(value) {
		return {
			backgroundSize: `${(value * 100) / 10}% 100%`,
		};
	}

	return (
		<Formik
			initialValues={{
				business: 0,
				personal: 0,
				relationships: 0,
				monthlyIssue: "",
				priority: "",
				monthlyGoal: "",
			}}
			validationSchema={Yup.object({
				business: Yup.number().test(
					"atLeast",
					"This should be at least 1",
					(val) => val > 0
				),
				personal: Yup.number().test(
					"atLeast",
					"This should be at least 1",
					(val) => val > 0
				),
				relationships: Yup.number().test(
					"atLeast",
					"This should be at least 1",
					(val) => val > 0
				),
				monthlyIssue: Yup.string().required("Don't forget this one!"),
				priority: Yup.string().required("Don't forget this one!"),
				monthlyGoal: Yup.string().required("Don't forget this one!"),
			})}
			onSubmit={(values, actions) => {
				try {
					onSubmit(values);
					actions.setSubmitting(false);
				} catch (error) {
					console.error(error);
				}
			}}
		>
			{({ isSubmitting, submitCount, ...props }) => (
				<Form className="form">
					<div className="form-heading">
						<span>{constructDate()}</span>
					</div>

					<InputField
						text="How is your business?"
						name="business"
						as="input"
						type="range"
						min={0}
						max={10}
						className="range-container"
						style={getSliderSize(props.values.business)}
						spanText={props.values.business}
					/>

					<InputField
						text="How is your health?"
						name="personal"
						as="input"
						type="range"
						min={0}
						max={10}
						className="range-container"
						style={getSliderSize(props.values.personal)}
						spanText={props.values.personal}
					/>

					<InputField
						text="How are your relationships?"
						name="relationships"
						as="input"
						type="range"
						min={0}
						max={10}
						className="range-container"
						style={getSliderSize(props.values.relationships)}
						spanText={props.values.relationships}
					/>

					<InputField
						text="Issue to process today"
						name="monthlyIssue"
						as="textarea"
						className="text-input"
					/>

					<Select text="Priority" name="priority" className="select">
						<option value="">-- Select a Priority --</option>
						<option value="aA">A</option>
						<option value="bB">B</option>
						<option value="cQuestion">Question</option>
						<option value="dLightning">Lightning</option>
						<option value="eC">C</option>
					</Select>

					<InputField
						text="Goal before next meeting"
						name="monthlyGoal"
						as="textarea"
						className="text-input"
					/>

					<button type="submit" className="btn">
						{isSubmitting ? <LoadingSpinner color="orange" /> : "Submit"}
					</button>
				</Form>
			)}
		</Formik>
	);
}
