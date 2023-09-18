import { useState, useEffect } from "react";
//Internal
import { axiosFetch } from "../helpers";

export default function useMemberEdits() {
  const [usersToEdit, setUsersToEdit] = useState([]);

  useEffect(() => {
    fetchGuestUsers();
  }, []);

  async function fetchGuestUsers() {
    try {
      const response = await axiosFetch("get", "/db/users");
      setUsersToEdit(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleEditSubmit(data) {
    const memberEditResponse = await axiosFetch("put", "/db/users", data);
    console.log(memberEditResponse.data);
  }

  return [usersToEdit, handleEditSubmit];
}
