import { useState, useEffect } from "react";
//Internal
import { axiosFetch } from "../helpers";

export default function useMemberEdits() {
  const [usersToEdit, setUsersToEdit] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGuestUsers();
  }, []);

  async function fetchGuestUsers() {
    try {
      setLoading(true);
      const response = await axiosFetch("get", "/db/users");
      setUsersToEdit(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleEditSubmit(data) {
    try {
      setLoading(true);
      const memberEditResponse = await axiosFetch("put", "/db/users", data);
      console.log(memberEditResponse.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return [usersToEdit, loading, error, handleEditSubmit];
}
