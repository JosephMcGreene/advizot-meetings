// Components
import LoadingSpinner from "../../../shared/LoadingSpinner";
// Hooks
import useMemberEdits from "../../../hooks/useMemberEdits";

export default function MemberEditModal({ handleClose, currentGroup }) {
  const [
    usersToEdit,
    loading,
    selectedUser,
    deleteMemberValue,
    deleteMemberDisabled,
    userEditsEnabled,
    groupPlacementEnabled,
    confirmUserDeleteShown,
    confirmGroupChange,
    selectMember,
    deleteMember,
    handleEditType,
    setDeleteMemberValue,
    setConfirmUserDeleteShown,
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
            <option value="delete" style={{ color: "red" }}>
              Delete Member
            </option>
          </select>
        </label>
      )}

      {groupPlacementEnabled && (
        <label htmlFor="groupToPlace">
          Move Into Group
          <select
            onChange={(e) => confirmGroupChange(e.target.value, selectedUser)}
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
      )}

      {confirmUserDeleteShown && (
        <>
          <label htmlFor="user-name">
            <p style={{ textAlign: "left" }}>
              First, this cannot be undone.
              <br />
              <br />
              Furthermore, this will also permanently delete all of{" "}
              {selectedUser.firstName}'s hard-earned data, and it will be
              irretrievably lost.
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
            onClick={(e) => deleteMember(e, selectedUser)}
            className="delete-member-btn"
            disabled={deleteMemberDisabled}
          >
            Delete {selectedUser.firstName} {selectedUser.lastName}
          </button>

          <button
            onClick={() => setConfirmUserDeleteShown(false)}
            className="btn"
            type="button"
          >
            Cancel, Keep {selectedUser.firstName}
          </button>
        </>
      )}

      {userEditsEnabled && (
        <button onClick={handleClose} className="btn">
          Done
        </button>
      )}
    </form>
  );
}
