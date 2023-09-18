import { useState, useEffect } from "react";
//External
import { Formik, Form } from "formik";
import * as Yup from "yup";
//Internal
import { axiosFetch } from "../../../helpers";
//Components
import Select from "../form/Select";

export default function MemberEditModal({ handleMemberSubmit, handleClose }) {
  const [usersToView, setUsersToView] = useState([]);

  useEffect(() => {
    fetchGuestUsers();
  }, []);

  async function fetchGuestUsers() {
    try {
      const response = await axiosFetch("get", "/db/users");
      setUsersToView(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleEditSubmit(data) {
    const memberEditResponse = await axiosFetch("put", "/db/users", data);
    console.log(memberEditResponse.data);
  }

  return (
    <div className="modal-body">
      <Formik
        initialValues={{
          id: "",
          groupToPlace: "",
        }}
        validationSchema={Yup.object({
          id: Yup.string(),
          groupToPlace: Yup.string(),
        })}
        onSubmit={(values, actions) => {
          try {
            handleEditSubmit(values);
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
            <Select
              text="Member to Add to a Group"
              name="id"
              className="select"
            >
              <option value="">-- Select a Member --</option>
              {usersToView.map((guest) => (
                <option value={guest._id} key={guest._id}>
                  {guest.firstName} {guest.lastName}
                </option>
              ))}
            </Select>

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
