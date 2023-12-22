import { useContext } from "react";
import { ThemeContext } from "../../../App";
//External
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { redirect } from "react-router-dom";
//Components
import Select from "../form/Select";

export default function GroupModal({ handleGroupChangeSubmit, handleClose }) {
  const isDark = useContext(ThemeContext);

  return (
    <div className="modal-body">
      <Formik
        initialValues={{
          group: "",
        }}
        validationSchema={Yup.object({
          group: Yup.string(),
        })}
        onSubmit={({ group }, actions) => {
          try {
            // handleGroupChangeSubmit(values);
            redirect(`/meeting/${group}`);
            actions.setSubmitting(false);
          } catch (err) {
            console.error(err);
          } finally {
            handleClose();
          }
        }}
      >
        {() => (
          <Form className={isDark ? "form dark" : "form"}>
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
