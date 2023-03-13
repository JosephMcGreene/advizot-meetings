import { useState, useEffect } from "react";
import axiosFetch from "react";

export default function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    userFetch("get", "/auth/current_user");
  }, []);

  async function userFetch(method, url, data = null) {
    const response = await axiosFetch(method, url, data);
    setUser(response.data);
  }

  return [user, userFetch];
}
