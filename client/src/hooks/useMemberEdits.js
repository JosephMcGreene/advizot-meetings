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

   * @param {string} group the name of the group whose members' sign-ins are to be fetched 
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
   * userInfo.selectedUser === the user to move
   * userInfo.groupToPlace === name of the group to place the member in
   *
   * @param {object} userInfo information about the userand what group to move them to
   */
  function confirmGroupChange(userInfo) {
    if (
      window.confirm(
        `Move ${userInfo.selectedUser.firstName} ${userInfo.selectedUser.lastName} to ${userInfo.groupToPlace}?`
      )
    ) {
      changeGroup({
        firstName: userInfo.selectedUser.firstName,
        advizotID: userInfo.selectedUser.advizotID,
        _id: userInfo.selectedUser._id,
        groupToPlace: userInfo.groupToPlace,
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
   * @param {Object} e      the event object of the clicked button
   * @param {string} userID the MondoDB _id of the user whose data is to be deleted
   */
  async function deleteMember(e, userID) {
    try {
      setLoading(true);
      e.preventDefault();

      const { data } = await axiosFetch("delete", "/users", { _id: userID });
      console.log(data);
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
