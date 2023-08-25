import { useState, useEffect } from "react";
import { axiosFetch } from "../helpers";

export default function useUser(method, url) {
  const [fetchedData, setFetchedData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser(method, url);
  }, [method, url]);

  /**
   * Makes an HTTP request to the server asking for user authentication and information
   *
   * @param {string} method HTTP verb GET
   * @param {string} url    Endpoint of the proxy server used to fetch user data
   */
  async function fetchUser(method, url, data = null) {
    try {
      setLoading(true);
      const response = await axiosFetch(method, url, data);
      setFetchedData(response.data);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return [fetchedData, fetchUser, loading, error];
}
