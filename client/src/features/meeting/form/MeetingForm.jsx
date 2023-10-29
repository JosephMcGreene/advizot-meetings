//External
import { Formik, Form } from "formik";
import * as Yup from "yup";
//Components
import InputField from "./InputField";
import Select from "./Select";

export default function MeetingForm({
  handleSubmit,
  handleClose,
  existingResponse,
}) {
  /**
   * Determines the percentage of an input slider's background that should be filled up based on where the user has dragged the thumb
   *
   * @param {number} value The current value of the range-slider, used as a basis to calculate how much of the background of the slider needs to be filled
   *
   * @returns {Object} A styles object specifying the percentage of the background that should be filled in.
   */
  function sliderSizeOf(value) {
    return {
      backgroundSize: `${(value * 100) / 10}% 100%`,
    };
  }

  return (
    <div className="modal-body">
      <Formik
        initialValues={{
          business: existingResponse?.business || 0,
          personal: existingResponse?.personal || 0,
          relationships: existingResponse?.relationships || 0,
          monthlyIssue: existingResponse?.monthlyIssue || "",
          priority: existingResponse?.priority || "",
          monthlyGoal: existingResponse?.monthlyGoal || "",
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
            handleSubmit(values, existingResponse);
            actions.setSubmitting(false);
          } catch (err) {
            console.error(err);
          } finally {
            handleClose();
          }
        }}
      >
        {({ isSubmitting, submitCount, ...props }) => (
          <Form className="form">
            <InputField
              text="How is your business?"
              name="business"
              as="input"
              type="range"
              min={0}
              max={10}
              className="range-container"
              style={sliderSizeOf(props.values.business)}
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
              style={sliderSizeOf(props.values.personal)}
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
              style={sliderSizeOf(props.values.relationships)}
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
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
