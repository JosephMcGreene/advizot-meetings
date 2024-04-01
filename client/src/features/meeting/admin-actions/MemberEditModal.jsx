import { useState } from "react";
//Hooks
import useMemberEdits from "../../../hooks/useMemberEdits";
//Components
import LoadingSpinner from "../../../shared/LoadingSpinner";
import ModalTemplate from "../../../shared/modals/ModalTemplate";

export default function MemberEditModal({ handleClose, currentGroup }) {
  const [selectedUser, setSelectedUser] = useState("select");
  const [userEditsEnabled, setUserEditsEnabled] = useState(false);
  const [groupPlacementEnabled, setGroupPlacementEnabled] = useState(false);
  const [usersToEdit, loading, confirmGroupChange, deleteMember] =
    useMemberEdits(currentGroup);

  function selectMember(eventTargetVal) {
    if (eventTargetVal === "select") {
      setUserEditsEnabled(false);
      setSelectedUser(eventTargetVal);
    } else {
      setSelectedUser(
        usersToEdit.find((user) => user.advizotID === eventTargetVal)
      );
      setUserEditsEnabled(true);
    }
  }

  function handleSelectedEdit(eventTargetVal) {
    switch (eventTargetVal) {
      case "move":
        return setGroupPlacementEnabled(true);
      case "edit":
        //TODO Redirect to the user's profile once that feature is ready
        return alert(
          "This feature isn't ready yet. Thanks for the interest though!"
        );
      default:
        setUserEditsEnabled(false);
        setGroupPlacementEnabled(false);
        setSelectedUser("select");
    }
  }

  return (
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

      {userEditsEnabled && (
        <label htmlFor="howToEdit">
          How to Edit
          <select
            onChange={(e) => handleSelectedEdit(e.target.value)}
            id="howToEdit"
            className="rating-select"
          >
            <option value="select">-- Select One --</option>
            <option value="move">Move to Another Group</option>
            <option value="edit">Edit Profile</option>
          </select>
        </label>
      )}

      {groupPlacementEnabled && (
        <ModalTemplate
          title="Select a Group"
          handleClose={() => setGroupPlacementEnabled(false)}
        >
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
              <option value="select">-- Group --</option>
              <option value="CE5660">CE5660</option>
              <option value="KEY9330">KEY9330</option>
              <option value="CE4659">CE4659</option>
            </select>
          </label>

          <button
            onClick={() => setGroupPlacementEnabled(false)}
            type="button"
            className="btn"
          >
            Done
          </button>
        </ModalTemplate>
      )}

      {/* //TODO Add functionality to allow admins to delete members using this button */}
      {userEditsEnabled && (
        <button
          type="button"
          className="delete-member-btn"
          onClick={() => deleteMember(selectedUser._id)}
        >
          Delete Member
        </button>
      )}

      {userEditsEnabled && (
        <button onClick={handleClose} className="btn">
          Done
        </button>
      )}
    </form>
  );
}
