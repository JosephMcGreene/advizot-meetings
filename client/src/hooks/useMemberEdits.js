import { useState, useEffect, useContext } from "react";
import { ToastContext } from "../App";
//Internal
import { axiosFetch } from "../helpers";

export default function useMemberEdits(currentGroup) {
  const { showToast } = useContext(ToastContext);
  const [usersToEdit, setUsersToEdit] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    fetchUsers(currentGroup);
  }, []);

  /**
   * fetches data for all registered users who are currently assigned as a guest and updates state accordingly

   * @param {string} group the name of the group whose members' sign-ins are to be fetched 
   */
  async function fetchUsers(group) {
    try {
      setLoading(true);
      const response = await axiosFetch("post", "/users", { group });
      await setUsersToEdit(response.data);
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
    if (window.confirm(`Move ${userInfo.name} to ${userInfo.groupToPlace}?`)) {
      changeGroup({
        advizotID: userInfo.selectedUser.advizotID,
        _id: userInfo.selectedUser._id,
        groupToPlace: userInfo.groupToPlace,
      });
    } else {
      return;
    }
  }

  /**
   * sends data used to update a guest user to move them into a new group
   *
   * userInfo.selectedUser === the user to move
   * userInfo.groupToPlace === name of the group to place the member in
   *
   * @param {object} userInfo information about the userand what group to move them to
   */
  async function changeGroup(userInfo) {
    try {
      setLoading(true);

      const { data } = await axiosFetch("put", "/users", userInfo);

      await showToast(
        "success",
        `Added ${userInfo.selectedUser.firstName} to ${data.updatedGroup}`
      );
      if (data.numOfSignInUpdates > 0) {
        await showToast(
          "success",
          `Also moved ${data.numOfSignInUpdates} of ${userInfo.selectedUser.firstName}'s sign-ins.`
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
   * @param {string} advizotID the advizotID of the user whose data is to be deleted
   */
  async function deleteMember(advizotID) {
    try {
      setLoading(true);

      //TODO Add functionality to delete user, see also MemberEditsModal
    } catch (err) {
      await showToast("failure", "Something went wrong, unable to delete");
    } finally {
      setLoading(false);
    }
  }

  return [usersToEdit, loading, confirmGroupChange, deleteMember];
}
