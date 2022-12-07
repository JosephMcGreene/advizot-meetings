//External
import { Formik, Form } from "formik";
import * as Yup from "yup";
//Components
import InputField from "../form/InputField";
import LoadingSpinner from "../utilities/LoadingSpinner";

export default function MeetingCode({ onCodeSubmit }) {
  return (
    <Formik
      initialValues={{
        passcode: "",
      }}
      validationSchema={Yup.object({
        passcode: Yup.string().required("You must add a valid room code"),
      })}
      onSubmit={({ passcode }, actions) => {
        try {
          onCodeSubmit(passcode);
          actions.setSubmitting(false);
        } catch (error) {
          console.error(error);
        }
      }}
    >
      {({ isSubmitting, ...props }) => (
        <Form className="form">
          <InputField
            text="Please enter today's code:"
            name="passcode"
            as="input"
            type="text"
            className="text-input"
          />

          <button type="submit" className="btn">
            {isSubmitting ? <LoadingSpinner color="black" /> : "Enter Meeting"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
