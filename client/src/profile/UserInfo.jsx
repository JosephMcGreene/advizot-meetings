import { useContext, useState } from "react";
import { UserContext } from "../App";
// Assets
import { ReactComponent as EditPen } from "../assets/img/pen-solid.svg";
// Components
import EditProfileForm from "./EditProfileForm";
import ModalTemplate from "../shared/modals/ModalTemplate";

export default function UserInfo() {
  const user = useContext(UserContext);
  const userFullName = `${user.firstName} ${user.lastName}`;
  const [editProfileShown, setEditProfileShown] = useState(false);

  const userInfoToEdit = {
    email: user.email,
    firstName: user.firstName,
    group: user.group,
    lastName: user.lastName,
    photo: user.photo,
  };

  return (
    <>
      <article className="user-info">
        <img src={user.photo} alt={`${userFullName}`} />
        <h1 className="centered-heading">{userFullName}</h1>
        <h3>{user.email}</h3>

        <button
          className="btn"
          onClick={() => setEditProfileShown(true)}
          type="button"
        >
          <EditPen width="24" />
          Edit Profile
        </button>
      </article>

      {editProfileShown && (
        <ModalTemplate
          handleClose={() => setEditProfileShown(false)}
          title={`Edit ${user.firstName}`}
        >
          <EditProfileForm
            handleClose={() => setEditProfileShown(false)}
            userInfoToEdit={userInfoToEdit}
          />
        </ModalTemplate>
      )}
    </>
  );
}
