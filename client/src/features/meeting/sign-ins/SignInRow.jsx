import { useState, useContext } from "react";
import { UserContext } from "../../../App";
// Components
import TableCell from "./TableCell";
import DeleteButton from "./DeleteButton";

export default function SignInRow({
  signInBody,
  handleSubmitEdits,
  handleDelete,
  signInBelongsToUser,
}) {
  const user = useContext(UserContext);

  const [deleteBtnShown, setDeleteBtnShown] = useState(false);

  /**
   * @returns {boolean} whether or not the user is allowed to edit the sign-in
   */
  function canEdit() {
    if (signInBelongsToUser(signInBody) || user.role === "admin") return true;
    return false;
  }

  return (
    <tr
      className="tbody-row"
      onMouseEnter={() => setDeleteBtnShown(true)}
      onMouseLeave={() => setDeleteBtnShown(false)}
    >
      <th className="tbody-th">
        {deleteBtnShown && canEdit() && (
          <DeleteButton signInID={signInBody._id} handleDelete={handleDelete} />
        )}

        <h4 className="tbody-row-name">{signInBody.userName}</h4>
        <h5>Priority: {signInBody.priority.substring(1)}</h5>
      </th>

      <TableCell
        signInBody={signInBody}
        canEdit={canEdit}
        handleSubmitEdits={handleSubmitEdits}
      />
    </tr>
  );
}
