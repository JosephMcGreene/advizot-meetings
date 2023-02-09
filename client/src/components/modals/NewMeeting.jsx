import { Formik, Form } from "formik";
import * as Yup from "yup";
import Select from "./form/Select";
import LoadingSpinner from "../utilities/LoadingSpinner";

export default function NewMeeting({ onSubmit, onClose }) {
  return (
    <Formik
      initialValues={{
        group: "",
      }}
      validationSchema={Yup.object({
        group: Yup.string().required("Don't forget this one!"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        try {
          console.log(values);
          onSubmit(values);
          setSubmitting(false);
          onClose();
        } catch (error) {
          console.error(error);
        }
      }}
      className="modal-body"
    >
      {({ isSubmitting, ...props }) => (
        <Form>
          <Select text="Group" name="group" className="select">
            <option value="">-- Select a Group --</option>
            <option value="CE5660">CE 5660</option>
            <option value="KEY9330">KEY 9330</option>
            <option value="CE4659">CE 4659</option>
          </Select>

          <button type="submit" className="btn">
            {isSubmitting ? <LoadingSpinner color="orange" /> : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
