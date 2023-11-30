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
   * sends data used to update a guest user to place them into a group
   *
   * data.advizotID == associated user's advizot ID
   *
   * data.groupToPlace == name of the group to place the member in
   *
   * @param {object} formValues
   */
  async function handleEditSubmit(formValues) {
    try {
      setLoading(true);

      const editedUser = usersToEdit.find(
        (user) => user.advizotID === formValues.advizotID
      );
      formValues.oldGroup = editedUser.group;
      formValues.id = editedUser._id;

      const { data } = await axiosFetch("put", "/users", formValues);

      await showToast(
        "success",
        `Added ${editedUser.firstName} to ${data.updatedGroup}`
      );
      if (data.numOfSignInUpdates > 0) {
        await showToast(
          "success",
          `Updated ${data.numOfSignInUpdates} of ${editedUser.firstName}'s sign-ins.`
        );
      }
    } catch (err) {
      await showToast("failure", "Something went wrong, unable to make edits");
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  return [usersToEdit, loading, handleEditSubmit];
}
