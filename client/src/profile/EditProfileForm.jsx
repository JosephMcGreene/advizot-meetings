import { useState } from "react";

export default function EditProfileForm({ handleClose, userInfoToEdit }) {
  const [firstNameEditable, setFirstNameEditable] = useState(false);
  const [lastNameEditable, setLastNameEditable] = useState(false);
  const [emailEditable, setEmailNameEditable] = useState(false);

  function done() {
    setEmailNameEditable(false);
    setFirstNameEditable(false);
    setLastNameEditable(false);

    handleClose();
  }

  return (
    <form>
      <h3>First Name:</h3>
      {firstNameEditable ? (
        <input placeholder={`${userInfoToEdit.firstName}`} type="text" />
      ) : (
        <p onClick={() => setFirstNameEditable(true)}>
          {userInfoToEdit.firstName}
        </p>
      )}

      <h3>Last Name:</h3>
      {lastNameEditable ? (
        <input placeholder={`${userInfoToEdit.lastName}`} type="text" />
      ) : (
        <p onClick={() => setLastNameEditable(true)}>
          {userInfoToEdit.lastName}
        </p>
      )}

      <h3>Email:</h3>
      <input placeholder={`${userInfoToEdit.lastName}`} type="text" />
      {emailEditable ? (
        <input type="text" placeholder={`${userInfoToEdit.email}`} />
      ) : (
        <p onClick={() => setEmailNameEditable(true)}>{userInfoToEdit.email}</p>
      )}

      <button className="btn" onClick={() => done()}>
        {emailEditable || firstNameEditable || lastNameEditable
          ? "Save Changes"
          : "Close"}
      </button>
    </form>
  );
}
