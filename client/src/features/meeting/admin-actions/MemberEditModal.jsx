import { useState } from "react";
//Hooks
import useMemberEdits from "../../../hooks/useMemberEdits";
//Components
import LoadingSpinner from "../../../shared/LoadingSpinner";
import ModalTemplate from "../../../shared/modals/ModalTemplate";

export default function MemberEditModal({ handleClose, currentGroup }) {
  const [confirmUserDeleteShown, setConfirmUserDeleteShown] = useState(false);
  const [
    usersToEdit,
    loading,
    selectedUser,
    deleteMemberValue,
    deleteMemberDisabled,
    userEditsEnabled,
    groupPlacementEnabled,
    confirmGroupChange,
    selectMember,
    deleteMember,
    handleEditType,
    setDeleteMemberValue,
    setGroupPlacementEnabled,
  ] = useMemberEdits(currentGroup);

  const groups = ["CE5660", "KEY9330", "CE4659", "Guest"];
  const allButThisGroup = groups.filter((group) => group !== currentGroup);

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
            <option value="none">-- Select a Member --</option>
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
          What do you want to do?
          <select
            onChange={(e) => handleEditType(e.target.value)}
            id="howToEdit"
            className="rating-select"
          >
            <option value="none">-- Select One --</option>
            <option value="move">Move to Another Group</option>
            <option value="edit">Edit Profile</option>
          </select>
        </label>
      )}

      {groupPlacementEnabled && (
        <ModalTemplate
          title="Select a Group"
          handleClose={() => {
            setGroupPlacementEnabled(false);
            selectMember("none");
          }}
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
              {allButThisGroup.map((group) => (
                <option value={group} key={group}>
                  {group}
                </option>
              ))}
            </select>
          </label>

          <button
            onClick={() => {
              setGroupPlacementEnabled(false);
              selectMember("none");
            }}
            type="button"
            className="btn"
          >
            Done
          </button>
        </ModalTemplate>
      )}

      {userEditsEnabled && (
        <button
          type="button"
          className="delete-member-btn"
          onClick={() => setConfirmUserDeleteShown(true)}
        >
          Delete Member
        </button>
      )}

      {confirmUserDeleteShown && (
        <ModalTemplate
          title="Are you sure?"
          handleClose={() => setConfirmUserDeleteShown(false)}
        >
          <label htmlFor="user-name">
            <p style={{ textAlign: "left" }}>
              First, this cannot be undone.
              <br />
              <br />
              Furthermore, this will also permanently delete all of the member's
              hard-earned data, and it will be irretrievably lost.
              <br />
              <br />
              If you know you will never need this member's information again,
              type{" "}
              <em>
                {selectedUser.firstName} {selectedUser.lastName}
              </em>{" "}
              and press delete.
            </p>
            <br />
            <input
              type="text"
              className="rating-select"
              value={deleteMemberValue}
              onChange={(e) => setDeleteMemberValue(e.target.value)}
            />
          </label>

          <button
            onClick={(e) =>
              deleteMember(e, selectedUser._id, selectedUser.firstName)
            }
            className="delete-member-btn"
            disabled={deleteMemberDisabled}
          >
            Delete {selectedUser.firstName} {selectedUser.lastName}
          </button>
        </ModalTemplate>
      )}

      {userEditsEnabled && (
        <button onClick={handleClose} className="btn">
          Done
        </button>
      )}
    </form>
  );
}
