// Components
import InputField from "../../shared/form/InputField";
// External
import { Formik, Form } from "formik";
import * as Yup from "yup";

type Props = {
  handleSubmit: () => void;
  incorrectCode: string;
};

export default function RoomCodeEntry({ handleSubmit, incorrectCode }: Props) {
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
        <Form className="form">
          <InputField
            as="input"
            className="text-input"
            incorrectCode={incorrectCode}
            name="roomCode"
            text="Please enter today's code:"
            type="text"
          />

          <button className="btn" type="submit">
            Enter Meeting
          </button>
        </Form>
      )}
    </Formik>
  );
}
