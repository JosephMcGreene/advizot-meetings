import { useState, useEffect, useContext } from "react";
import { ToastContext } from "../App";
//Internal
import { axiosFetch } from "../helpers";

export default function useMemberEdits(currentGroup) {
  const { showToast } = useContext(ToastContext);
  const [usersToEdit, setUsersToEdit] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
      await showToast("success", `Now showing sign-ins from ${group}`);
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
   * data.id === database ID of user to be updated()
   * data.groupToPlace === name of the group to place the member in
   *
   * @param {object} data
   */
  async function handleEditSubmit(data) {
    try {
      setLoading(true);
      const updatedGroup = await axiosFetch("put", "/users", data);

      return updatedGroup;
    } catch (err) {
      showToast("failure", "Something went wrong, unable to edit member group");
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  return [usersToEdit, loading, handleEditSubmit];
}
