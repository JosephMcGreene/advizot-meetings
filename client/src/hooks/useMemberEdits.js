import { useState, useEffect, useContext } from "react";
import { ToastContext } from "../App";
// Internal
import { axiosFetch } from "../helpers";

export default function useMemberEdits(currentGroup) {
  const { showToast } = useContext(ToastContext);
  const [loading, setLoading] = useState(false);
  const [usersToEdit, setUsersToEdit] = useState([]);
  const [selectedUser, setSelectedUser] = useState("none");
  const [userEditsEnabled, setUserEditsEnabled] = useState(false);
  const [deleteMemberValue, setDeleteMemberValue] = useState("");
  const [deleteMemberDisabled, setDeleteMemberDisabled] = useState(true);
  const [groupPlacementEnabled, setGroupPlacementEnabled] = useState(false);

  useEffect(() => {
    const selectedUserFullName =
      selectedUser.firstName + " " + selectedUser.lastName;
    if (deleteMemberValue === selectedUserFullName) {
      setDeleteMemberDisabled(false);
    } else {
      setDeleteMemberDisabled(true);
    }
    // eslint-disable-next-line
  }, [deleteMemberValue]);

  useEffect(() => {
    fetchUsers(currentGroup);
    // eslint-disable-next-line
  }, []);

  /**
   * fetches data for all registered users who are currently assigned as a guest and updates state accordingly

   * @param {string} group the group whose members' sign-ins are to be fetched 
   */
  async function fetchUsers(group) {
    try {
      setLoading(true);
      const { data } = await axiosFetch("post", "/users", { group });
      await setUsersToEdit(data);
    } catch (err) {
      await showToast(
        "failure",
        `Something went wrong, unable to view ${group}`
      );
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  /**
   * confirms with the iser that they would like to move the user they have selected into a new group. If confirmed, calls changeGroup() to initiate the move
   *
   * @param {string} groupToPlace the group to place the user into
   * @param {object} userInfo     information about the user to be moved
   */
  function confirmGroupChange(
    groupToPlace,
    { firstName, lastName, advizotID, _id }
  ) {
    if (window.confirm(`Move ${firstName} ${lastName} to ${groupToPlace}?`)) {
      changeGroup({
        firstName,
        advizotID,
        _id,
        groupToPlace,
      });
    } else {
      return;
    }
  }

  /**
   * sends data used to move a user into a new group
   *
   * @param {object} dataForGroupChange information about the user and what group to move them to
   */
  async function changeGroup(dataForGroupChange) {
    try {
      setLoading(true);

      const { data } = await axiosFetch("put", "/users", dataForGroupChange);

      await showToast(
        "success",
        `Moved ${dataForGroupChange.firstName} to ${data.updatedGroup}`
      );
      if (data.numOfSignInUpdates > 0) {
        await showToast(
          "success",
          `Also moved all (${data.numOfSignInUpdates}) of ${dataForGroupChange.firstName}'s sign-ins.`
        );
      }
    } catch (err) {
      await showToast("failure", "Something went wrong, unable to move member");
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Makes a DELETE request to the database to remove data trributed to the user that corresponds to the advizaotID passed as an argument
   * @param {Object} e         the event object of the clicked button
   * @param {string} _id       the MondoDB _id of the user whose data is to be deleted
   * @param {string} advizotID The advizotID of the member to be deleted
   * @param {string} firstName The first name of the member to be deleted
   */
  async function deleteMember(e, { _id, advizotID, firstName }) {
    try {
      setLoading(true);
      e.preventDefault();

      const { data } = await axiosFetch("delete", "/users", { _id, advizotID });
      await showToast("success", `User Deleted, say goodbye to ${firstName}.`);
      await showToast(
        "success",
        `Also deleted all (${data.deletedCount}) of ${firstName}'s sign-ins`
      );
    } catch (err) {
      await showToast("failure", "Something went wrong, unable to delete");
    } finally {
      setLoading(false);
    }
  }

  /**
   * takes a user's advizotID gleaned from a form value, finds the user object associated with that ID, and assigns that user object to state as the currently selected user to edit
   *
   * @param {string} advizotID the ID of the selected user
   */
  function selectMember(advizotID) {
    if (advizotID === "none") {
      setUserEditsEnabled(false);
      setSelectedUser("none");
    } else {
      setSelectedUser(usersToEdit.find((user) => user.advizotID === advizotID));
      setUserEditsEnabled(true);
    }
  }

  /**
   * Switches through the selected edit type the user wants to do and forwards control to the corresponding edit type's function(s)
   *
   * @param {string} editType a label for the type of edit the user wants to do
   * @returns {function | null}
   */
  function handleEditType(editType) {
    switch (editType) {
      case "none":
        setGroupPlacementEnabled(false);
        return selectMember("none");
      case "move":
        return setGroupPlacementEnabled(true);
      case "edit":
        //TODO Redirect to the user's profile once that feature is ready
        return alert(
          "This feature isn't ready yet. Thanks for the interest though!"
        );
      default:
        setGroupPlacementEnabled(false);
        selectMember("none");
    }
  }

  return [
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
  ];
}
