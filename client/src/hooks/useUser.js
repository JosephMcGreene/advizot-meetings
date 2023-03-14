import { useState, useEffect } from "react";
import { axiosFetch } from "../helpers";

export default function useUser() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser("get", "/auth/current_user");
  }, []);

  async function fetchUser(method, url, data = null) {
    try {
      setLoading(true);
      const response = await axiosFetch(method, url, data);
      setUser(response.data);
    } catch (err) {
      setError(err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return [user, loading, error, fetchUser];
}
