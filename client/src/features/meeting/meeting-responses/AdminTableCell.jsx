import { useState } from "react";
import editPen from "../../../assets/img/pen-solid.svg";
//Hooks
import useResponses from "../../../hooks/useResponses";

export default function AdminTableCell({ userResponse, responseItem }) {
  const [editPenShown, setEditPenShown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [priority, setPriority] = useState(userResponse.priority);
  const [business, setBusiness] = useState(userResponse.business);
  const [personal, setPersonal] = useState(userResponse.personal);
  const [relationships, setRelationships] = useState(userResponse);
  const [issue, setIssue] = useState(userResponse.monthlyIssue);
  const [goal, setGoal] = useState(userResponse.monthlyGoal);
  //eslint-disable-next-line
  const [
    sortedResponses,
    loading,
    error,
    submitResponse,
    deleteResponse,
    submitEdits,
  ] = useResponses();

  function handleSubmitEdits(e) {
    e.preventDefault();
    submitEdits(priority, userResponse._id);
    setIsEditing(false);
  }

  if (!isEditing) {
    return (
      <td
        onMouseEnter={() => setEditPenShown(true)}
        onMouseLeave={() => setEditPenShown(false)}
        onClick={() => setIsEditing(true)}
        className="admin-table-cell"
      >
        {responseItem}
        {editPenShown && <img src={editPen} alt="pen" className="edit-pen" />}
      </td>
    );
  }

  if (isEditing && userResponse.priority.substring(1) === responseItem) {
    return (
      <td className="admin-table-cell">
        <form className="form" onSubmit={(e) => handleSubmitEdits(e)}>
          <select
            className="select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="aA">A</option>
            <option value="bB">B</option>
            <option value="cQuestion">Question</option>
            <option value="dLightning">Lightning</option>
            <option value="eC">C</option>
          </select>

          <button type="submit">Done</button>
        </form>
      </td>
    );
  }

  if (
    (isEditing && userResponse.business === responseItem) ||
    userResponse.personal === responseItem ||
    userResponse.relationship === responseItem
  ) {
    return (
      <td className="admin-table-cell">
        <form className="form" onSubmit={() => setIsEditing(false)}>
          <input type="number" min="1" max="10" />
          <button type="submit">Done</button>
        </form>
      </td>
    );
  }

  if (
    (isEditing && userResponse.monthlyIssue === responseItem) ||
    userResponse.monthlyGoal === responseItem
  ) {
    return (
      <td className="admin-table-cell">
        <form className="form" onSubmit={() => setIsEditing(false)}>
          <input type="textarea" />
          <button type="submit  ">Done</button>
        </form>
      </td>
    );
  }
}
