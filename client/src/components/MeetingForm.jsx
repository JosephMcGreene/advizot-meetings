//Internal
import InputField from "./InputField";
import Select from "./Select";

//External
import { Formik, Form } from "formik";
import * as Yup from "yup";

export default function MeetingForm({ onSubmit, showModal }) {
	function getSliderSizes(value) {
		return {
			backgroundSize: `${(value * 100) / 10}% 100%`,
		};
	}

	return (
		<Formik
			initialValues={{
				name: "",
				business: 0,
				personal: 0,
				relationships: 0,
				monthlyIssue: "",
				priority: "",
				monthlyGoal: "",
			}}
			validationSchema={Yup.object({
				name: Yup.string().required("Name is required"),
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
			onSubmit={(values, { setSubmitting }) => {
				onSubmit(values);
				setSubmitting(false);
			}}
		>
			{({ isSubmitting, submitCount, ...props }) => (
				<Form className="form">
					<InputField
						text="Name:"
						name="name"
						as="input"
						type="input"
						className="personal-info"
						spanText={null}
						showModal={showModal}
					/>

					<InputField
						text="How is your business?"
						name="business"
						as="input"
						type="range"
						min={0}
						max={10}
						className="range-container"
						style={getSliderSizes(props.values.business)}
						spanText={props.values.business}
						showModal={showModal}
					/>

					<InputField
						text="How is your health?"
						name="personal"
						as="input"
						type="range"
						min={0}
						max={10}
						className="range-container"
						style={getSliderSizes(props.values.personal)}
						spanText={props.values.personal}
						showModal={showModal}
					/>

					<InputField
						text="How are your relationships?"
						name="relationships"
						as="input"
						type="range"
						min={0}
						max={10}
						className="range-container"
						style={getSliderSizes(props.values.relationships)}
						spanText={props.values.relationships}
						showModal={showModal}
					/>

					<InputField
						text="Issue to process today:"
						name="monthlyIssue"
						as="textarea"
						className="textarea"
						spanText={null}
					/>

					<Select text="Priority:" name="priority" className="priority">
						<option value="">-- Select a Priority --</option>
						<option value="A">A</option>
						<option value="B">B</option>
						<option value="C">C</option>
						<option value="Question">Question</option>
						<option value="Lightning">Lightning</option>
					</Select>

					<InputField
						text="Goal before next meeting:"
						name="monthlyGoal"
						as="textarea"
						className="textarea"
						spanText={null}
					/>

					<button type="submit" className="btn">
						{isSubmitting ? "Submitting..." : "Submit"}
					</button>
				</Form>
			)}
		</Formik>
	);
}
