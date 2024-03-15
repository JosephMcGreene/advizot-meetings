import { useState } from "react";
//External
import { Formik, Form } from "formik";
import * as Yup from "yup";
//Hooks
import useMemberEdits from "../../../hooks/useMemberEdits";
//Components
import Select from "../form/Select";
import LoadingSpinner from "../../../shared/LoadingSpinner";

export default function MemberEditModal({ handleClose, currentGroup }) {
  const [selectedMemberID, setSelectedMemberID] = useState("");
  const [userNotSelected, setUserNotSelected] = useState(true);
  const [usersToEdit, loading, handleEditSubmit, deleteMember] =
    useMemberEdits(currentGroup);

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
            await handleEditSubmit(values);
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
              text="Place Into Group"
              name="groupToPlace"
              className="select"
            >
              <option value="">-- Select a Group --</option>
              <option value="CE5660">CE5660</option>
              <option value="KEY9330">KEY9330</option>
              <option value="CE4659">CE4659</option>
            </Select>

            {/* //TODO Add functionality to allow admins to delete members using this button */}
            {usersToEdit.length > 0 && (
              <button
                type="button"
                className="delete-member-btn"
                disabled={userNotSelected}
                //TODO Get access to member's advizotID from the Select component above
                onClick={() => deleteMember()}
              >
                Delete Member
              </button>
            )}
            <button type="submit" className="btn">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
