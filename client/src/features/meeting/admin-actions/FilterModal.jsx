//External
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
//Components
import Select from "../form/Select";

export default function FilterModal({ handleFilterSubmit, handleClose }) {
  return (
    <div className="modal-body">
      <Formik
        initialValues={{
          group: "",
          viewAdminResponses: false,
        }}
        validationSchema={Yup.object({
          group: Yup.string(),
          viewAdminResponses: Yup.bool(),
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
              <option value="ce5660">CE5660</option>
              <option value="key9330">KEY9330</option>
              <option value="ce4659">CE4659</option>
              <option value="guest">Guests</option>
            </Select>

            <label>
              <Field
                type="checkbox"
                name="viewAdminResponses"
                className="checkbox"
              />
              View my own Responses
            </label>

            <button type="submit" className="btn">
              Submit
            </button>
            <button type="reset" className="btn">
              Reset Filters
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}