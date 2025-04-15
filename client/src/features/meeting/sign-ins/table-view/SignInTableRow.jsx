import { useState, useContext } from "react";
import { UserContext } from "../../../../App";
// Components
import TableCell from "./TableCell";
import DeleteButton from "../DeleteButton";

export default function SignInTableRow({
  signInBody,
  handleSubmitEdits,
  handleDelete,
  signInBelongsToUser,
}) {
  const user = useContext(UserContext);

  const [deleteBtnShown, setDeleteBtnShown] = useState(false);

  /**
   *
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
      </th>

      <TableCell
        signInBody={signInBody}
        signInItem={signInBody.priority.substring(1)}
        canEdit={canEdit}
        handleSubmitEdits={handleSubmitEdits}
      />
      <TableCell
        signInBody={signInBody}
        signInItem={signInBody.business}
        canEdit={canEdit}
        handleSubmitEdits={handleSubmitEdits}
      />
      <TableCell
        signInBody={signInBody}
        signInItem={signInBody.personal}
        canEdit={canEdit}
        handleSubmitEdits={handleSubmitEdits}
      />
      <TableCell
        signInBody={signInBody}
        signInItem={signInBody.relationships}
        canEdit={canEdit}
        handleSubmitEdits={handleSubmitEdits}
      />
      <TableCell
        signInBody={signInBody}
        signInItem={signInBody.monthlyIssue}
        canEdit={canEdit}
        handleSubmitEdits={handleSubmitEdits}
      />
      <TableCell
        signInBody={signInBody}
        signInItem={signInBody.monthlyGoal}
        canEdit={canEdit}
        handleSubmitEdits={handleSubmitEdits}
      />
    </tr>
  );
}
