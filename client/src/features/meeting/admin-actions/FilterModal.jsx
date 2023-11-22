//External
import { Formik, Form } from "formik";
import * as Yup from "yup";
//Components
import Select from "../form/Select";

export default function FilterModal({ handleFilterSubmit, handleClose }) {
  return (
    <div className="modal-body">
      <Formik
        initialValues={{
          group: "",
        }}
        validationSchema={Yup.object({
          group: Yup.string(),
        })}
        onSubmit={(values, actions) => {
          try {
            handleFilterSubmit(values);
            actions.setSubmitting(false);
          } catch (err) {
            console.error(err);
          } finally {
            handleClose();
          }
        }}
      >
        {() => (
          <Form className="form">
            <Select text="Group to View" name="group" className="select">
              <option value="">-- Select a Group --</option>
              <option value="CE5660">CE5660</option>
              <option value="KEY9330">KEY9330</option>
              <option value="CE4659">CE4659</option>
              <option value="guest">Guests</option>
            </Select>

            <button type="submit" className="btn">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
