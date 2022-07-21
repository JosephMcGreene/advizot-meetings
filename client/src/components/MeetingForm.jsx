//Internal
// import editPencil from "../img/pencil-alt-solid.svg";
import InputField from "./InputField";
import Select from "./Select";

//External
import { Formik, Form } from "formik";
import * as Yup from "yup";

export default function MeetingForm({ onSubmit }) {
	function getSliderBGSize(value) {
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
				business: Yup.number().required("Don't forget this one!"),
				personal: Yup.number().required("Don't forget this one!"),
				relationships: Yup.number().required("Don't forget this one!"),
				monthlyIssue: Yup.string().required("Don't forget this one!"),
				priority: Yup.string().required("Don't forget this one!"),
				monthlyGoal: Yup.string().required("Don't forget this one!"),
			})}
			onSubmit={(values, actions) => {
				setTimeout(() => {
					onSubmit(values);
					actions.setSubmitting(false);
				}, 0);
			}}
		>
			{({ isSubmitting, submitCount, ...props }) => (
				<Form className="form">
					<InputField
						label="Name:"
						name="name"
						as="input"
						type="input"
						className="personal-info"
					/>

					<div className="range-container">
						<InputField
							label="How is your business?"
							name="business"
							as="input"
							type="range"
							min={0}
							max={10}
							className="rating"
							style={getSliderBGSize(props.values.business)}
						/>
						<span className="rangeValue">{props.values.business}</span>
					</div>

					<div className="range-container">
						<InputField
							label="How is your health?"
							name="personal"
							as="input"
							type="range"
							min={0}
							max={10}
							className="rating"
							style={getSliderBGSize(props.values.personal)}
						/>
						<span className="rangeValue">{props.values.personal}</span>
					</div>

					<div className="range-container">
						<InputField
							label="How are your relationships?"
							name="relationships"
							as="input"
							type="range"
							min={0}
							max={10}
							className="rating"
							style={getSliderBGSize(props.values.relationships)}
						/>
						<span className="rangeValue">{props.values.relationships}</span>
					</div>

					<InputField
						label="Issue to process today:"
						name="monthlyIssue"
						as="textarea"
						className="textarea"
					/>

					<Select label="Priority:" name="priority" className="priority">
						<option value="">-- Select a Priority --</option>
						<option value="A">A</option>
						<option value="B">B</option>
						<option value="C">C</option>
						<option value="Question">Question</option>
						<option value="Lightning">Lightning</option>
					</Select>

					<InputField
						label="Goal before next meeting:"
						name="monthlyGoal"
						as="textarea"
						className="textarea"
					/>

					<button type="submit" className="btn">
						{isSubmitting ? "Submitting..." : "Submit"}
					</button>

					{submitCount >= 1 ? (
						<span className="submit-confirmation">Got it, thanks!</span>
					) : (
						""
					)}
				</Form>
			)}
		</Formik>
	);
}
