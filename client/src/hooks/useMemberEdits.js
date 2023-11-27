import { useState, useEffect } from "react";
//Internal
import { axiosFetch } from "../helpers";

export default function useMemberEdits(currentGroup) {
  const [usersToEdit, setUsersToEdit] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers(currentGroup);
  }, []);

  /**
   * fetches data for all registered users who are currently assigned as a guest and updates state accordingly
   */
  async function fetchUsers(group) {
    try {
      setLoading(true);
      const response = await axiosFetch("post", "/users", { group: group });
      setUsersToEdit(response.data);
    } catch (err) {
      console.log(err);
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
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return [usersToEdit, loading, handleEditSubmit];
}
