import { useState, useEffect } from "react";
import { axiosFetch } from "../../helpers";

export default function useUser() {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUser("get", "/auth/current_user");
  }, []);

  async function fetchUser(method, url, data = null) {
    try {
      const response = await axiosFetch(method, url, data);
      setUser(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  return [user, fetchUser];
}
