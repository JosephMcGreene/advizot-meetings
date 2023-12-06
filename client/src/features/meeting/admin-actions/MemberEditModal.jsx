import { useContext } from "react";
import { ThemeContext } from "../../../App";
//External
import { Formik, Form } from "formik";
import * as Yup from "yup";
//Components
import Select from "../form/Select";
import LoadingSpinner from "../../../shared/LoadingSpinner";

export default function MemberEditModal({ handleClose }) {
  const isDark = useContext(ThemeContext);

  return (
    <div className="modal-body">
      <Formik
        initialValues={{
          advizotID: "",
          groupToPlace: "",
        }}
        validationSchema={Yup.object({
          advizotID: Yup.string().required("Don't forget this one!"),
          groupToPlace: Yup.string().required("Don't forget this one!"),
        })}
        onSubmit={async (values, actions) => {
          try {
            // await handleEditSubmit(values);
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
            {loading ? (
              <LoadingSpinner />
            ) : (
              <Select text="Member" name="advizotID" className="select">
                <option value="">-- Select a Member --</option>
                {usersToEdit.map((user, index) => (
                  <option value={user.advizotID} key={user.advizotID + index}>
                    {user.firstName} {user.lastName}
                  </option>
                ))}
              </Select>
            )}

            <Select
              text="Group to Place Into"
              name="groupToPlace"
              className="select"
            >
              <option value="">-- Select a Group --</option>
              <option value="CE5660">CE5660</option>
              <option value="KEY9330">KEY9330</option>
              <option value="CE4659">CE4659</option>
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
