import { useContext } from "react";
import { ThemeContext } from "../../../App";
//External
import { Formik, Form } from "formik";
import * as Yup from "yup";
//Components
import InputField from "../form/InputField";
import LoadingSpinner from "../../../shared/LoadingSpinner";

export default function RoomCodeEntry({ handleSubmit }) {
  const isDark = useContext(ThemeContext);

  return (
    <Formik
      initialValues={{
        roomCode: "",
      }}
      validationSchema={Yup.object({
        roomCode: Yup.string().required("You must add a valid room code"),
      })}
      onSubmit={({ roomCode }, actions) => {
        try {
          handleSubmit(roomCode);
          actions.setSubmitting(true);
        } catch (error) {
          console.error(error);
        }
      }}
    >
      {({ isSubmitting, ...props }) => (
        <Form className={isDark ? "form dark" : "form"}>
          <InputField
            text="Please enter today's code:"
            name="roomCode"
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
