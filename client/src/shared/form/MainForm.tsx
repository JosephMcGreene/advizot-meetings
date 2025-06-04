import { useContext } from "react";
import { UserContext } from "../../App";
// Components
import InputField from "./InputField";
import Select from "./Select";
// External
import { Formik, Form } from "formik";
import * as Yup from "yup";
// Types
import type { SignIn } from "../../types/signIn.d.ts";

type Props = {
  existingSignIn: SignIn;
  handleClose: () => void;
  handleSubmit: () => void;
};

export default function MainForm({
  existingSignIn,
  handleClose,
  handleSubmit,
}: Props) {
  const user = useContext(UserContext);

  /**
   * Determines the percentage of an input slider's background that should be filled up based on where the user has dragged the thumb.
   * @param   {number} value The current value of the range-slider, used as a basis to calculate how much of the background of the slider needs to be filled.
   * @returns {object}       A styles object specifying the percentage of the background that should be filled in.
   */
  function sliderSizeOf(value) {
    return {
      backgroundSize: `${(value * 100) / 10}% 100%`,
    };
  }

  return (
    <Formik
      initialValues={{
        business: existingSignIn?.business || 0,
        personal: existingSignIn?.personal || 0,
        relationships: existingSignIn?.relationships || 0,
        monthlyIssue: existingSignIn?.monthlyIssue || "",
        priority: existingSignIn?.priority || "",
        monthlyGoal: existingSignIn?.monthlyGoal || "",
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
          handleSubmit(values, existingSignIn);
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
            as="input"
            className="range-container"
            max={10}
            min={0}
            name="business"
            spanText={props.values.business}
            style={sliderSizeOf(props.values.business)}
            text="How is your business?"
            type="range"
          />

          <InputField
            as="input"
            className="range-container"
            max={10}
            min={0}
            name="personal"
            spanText={props.values.personal}
            style={sliderSizeOf(props.values.personal)}
            text="How is your health?"
            type="range"
          />
          <InputField
            as="input"
            className="range-container"
            max={10}
            min={0}
            name="relationships"
            spanText={props.values.relationships}
            style={sliderSizeOf(props.values.relationships)}
            text="How are your relationships?"
            type="range"
          />
          <InputField
            as="textarea"
            className="text-input"
            name="monthlyIssue"
            text="Issue to process today"
          />
          <Select className="select" name="priority" text="Priority">
            <option value="">-- Select a Priority --</option>
            <option value="aA">A</option>
            <option value="bB">B</option>
            <option value="cQ">Question</option>
            <option value="dL">Lightning</option>
            {user.role === "admin" && existingSignIn && (
              <option value="zP">Processed</option>
            )}
          </Select>
          <InputField
            as="textarea"
            className="text-input"
            name="monthlyGoal"
            text="Goal before next meeting"
          />
          <button type="submit" className="btn">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
