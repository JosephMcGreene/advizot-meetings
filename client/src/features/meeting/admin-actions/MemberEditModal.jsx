import { useState } from "react";
//Hooks
import useMemberEdits from "../../../hooks/useMemberEdits";
//Components
import LoadingSpinner from "../../../shared/LoadingSpinner";

export default function MemberEditModal({ handleClose, currentGroup }) {
  const [selectedUser, setSelectedUser] = useState("");
  const [userEditsDisabled, setUserEditsDisabled] = useState(true);
  const [groupPlacementDisabled, setGroupPlacementDisabled] = useState(true);
  const [usersToEdit, loading, confirmGroupChange, deleteMember] =
    useMemberEdits(currentGroup);

  function selectMember(eventTargetVal) {
    setSelectedUser(
      usersToEdit.find((user) => user.advizotID === eventTargetVal)
    );

    setUserEditsDisabled(false);
  }

  function handleSelectedEdit(e) {
    switch (e.target.value) {
      case "move":
        return setGroupPlacementDisabled(false);
      case "edit":
        //TODO Redirect to the user's profile once that feature is ready
        return;
      default:
        return;
    }
  }

  return (
    <div className="modal-body">
      <form className="form">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <label htmlFor="memberSelect">
            Select a Member
            <select
              onChange={(e) => selectMember(e.target.value)}
              id="memberSelect"
              className="rating-select"
            >
              <option value="select">-- Select a Member --</option>
              {usersToEdit.map((user, index) => (
                <option value={user.advizotID} key={user.advizotID + index}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
          </label>
        )}

        {!userEditsDisabled && (
          <label htmlFor="howToEdit">
            How to Edit
            <select
              onChange={(e) => handleSelectedEdit(e)}
              id="howToEdit"
              className="rating-select"
            >
              <option value="">-- Select One --</option>
              <option value="move">Move to Another Group</option>
              <option value="edit">Edit Profile</option>
            </select>
          </label>
        )}

        {!groupPlacementDisabled && (
          <label htmlFor="groupToPlace">
            Move Into Group
            <select
              onChange={(e) =>
                confirmGroupChange({
                  selectedUser,
                  groupToPlace: e.target.value,
                })
              }
              id="groupToPlace"
              className="rating-select"
            >
              <option value="">-- Select a Group --</option>
              <option value="CE5660">CE5660</option>
              <option value="KEY9330">KEY9330</option>
              <option value="CE4659">CE4659</option>
            </select>
          </label>
        )}

        {/* //TODO Add functionality to allow admins to delete members using this button */}
        {!userEditsDisabled && (
          <button
            type="button"
            className="delete-member-btn"
            //TODO Get access to member's advizotID from the Select component above
            onClick={() => deleteMember()}
          >
            Delete Member
          </button>
        )}

        <button onClick={() => handleClose()} className="btn">
          Done
        </button>
      </form>
    </div>
  );
}
