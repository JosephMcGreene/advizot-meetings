import { useState } from "react";
//Hooks
import useMemberEdits from "../../../hooks/useMemberEdits";
//Components
import LoadingSpinner from "../../../shared/LoadingSpinner";

export default function MemberEditModal({ handleClose, currentGroup }) {
  const [selectedMemberID, setSelectedMemberID] = useState("");
  const [userNotSelected, setUserNotSelected] = useState(true);
  const [usersToEdit, loading, handleEditSubmit, deleteMember] =
    useMemberEdits(currentGroup);

  return (
    <div className="modal-body">
      <form className="form">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <label htmlFor="advizotID">
            Select a Member
            <select name="advizotID" id="advizotID" className="rating-select">
              <option value="">-- Select a Member --</option>
              {usersToEdit.map((user, index) => (
                <option value={user.advizotID} key={user.advizotID + index}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
          </label>
        )}

        <label htmlFor="howToEdit">
          How to Edit
          <select name="howToEdit" id="howToEdit" className="rating-select">
            <option value="">-- Select One --</option>
            <option value="move">Move to New Group</option>
            <option value="edit">Edit Profile</option>
          </select>
        </label>

        <label htmlFor="groupToPlace">
          Place Into Group
          <select
            name="groupToPlace"
            id="groupToPlace"
            className="rating-select"
          >
            <option value="">-- Select a Group --</option>
            <option value="CE5660">CE5660</option>
            <option value="KEY9330">KEY9330</option>
            <option value="CE4659">CE4659</option>
          </select>
        </label>

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
      </form>
    </div>
  );
}
