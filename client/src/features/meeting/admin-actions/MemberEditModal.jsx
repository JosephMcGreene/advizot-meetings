import { useContext } from "react";
import { ToastContext } from "../../../App";
//External
import { Formik, Form } from "formik";
import * as Yup from "yup";
//hooks
import useMemberEdits from "../../../hooks/useMemberEdits";
//Components
import ErrorPage from "../../../shared/ErrorPage";
import Select from "../form/Select";
import LoadingSpinner from "../../../shared/LoadingSpinner";

export default function MemberEditModal({ handleClose }) {
  const { showToast } = useContext(ToastContext);
  const [guestsToEdit, loading, error, handleEditSubmit] = useMemberEdits();

  if (error) return <ErrorPage error={error} />;

  return (
    <div className="modal-body">
      <Formik
        initialValues={{
          id: "",
          groupToPlace: "",
        }}
        validationSchema={Yup.object({
          id: Yup.string().required("Don't forget this one!"),
          groupToPlace: Yup.string().required("Don't forget this one!"),
        })}
        onSubmit={async (values, actions) => {
          try {
            const { data } = await handleEditSubmit(values);

            const editedUser = guestsToEdit.find(
              (guest) => guest._id === values.id
            );

            showToast(
              "success",
              `Added ${editedUser.firstName} to ${data.updatedGroup}`
            );

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
            {loading ? (
              <LoadingSpinner />
            ) : (
              <Select text="Member" name="id" className="select">
                <option value="">-- Select a Member --</option>
                {guestsToEdit.map((guest) => (
                  <option value={guest._id} key={guest._id}>
                    {guest.firstName} {guest.lastName}
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
