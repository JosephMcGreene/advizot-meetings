import { useContext } from "react";
import { UserContext } from "../../../App";
// Components
import DataColumn from "./DataColumn";
import NameColumn from "./NameColumn";

export default function SignInRow({
  signInBody,
  handleSubmitEdits,
  handleDelete,
}) {
  const user = useContext(UserContext);

  /**
   * Assesses whether the current user has permissions to edit or delete the sign-in they hover over
   *
   * @returns {boolean} whether or not the user can edit or delete the sign-in
   */
  function signInBelongsToUser(signInID) {
    if (user.advizotID === signInID) return true;
    return false;
  }

  /**
   * @returns {boolean} whether or not the user is authorized to edit the sign-in.
   */
  function canEdit() {
    if (signInBelongsToUser(signInBody?.userID) || user.role === "admin") {
      return true;
    }

    return false;
  }

  return (
    <li className="sign-in-item">
      <NameColumn
        canEdit={canEdit}
        handleDelete={handleDelete}
        handleSubmitEdits={handleSubmitEdits}
        signInBody={signInBody}
      />

      <DataColumn signInBody={signInBody} />
    </li>
  );
}
