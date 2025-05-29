import { useState, useEffect } from "react";
import useToasts from "./useToasts";
import { axiosFetch } from "../helpers";

export default function useUser(method, url) {
  const { showToast } = useToasts();
  const [fetchedData, setFetchedData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUser(method, url);
  }, [method, url]);

  /**
   * Makes an HTTP request to the server asking for user authentication and information.
   * @param {string} method HTTP verb GET.
   * @param {string} url    Endpoint of the proxy server used to fetch user data.
   */
  async function fetchUser(method, url, data = null) {
    try {
      setLoading(true);

      const response = await axiosFetch(method, url, data);
      setFetchedData(response.data);
    } catch (err) {
      await showToast(
        "failure",
        "Something went wrong, unable fetch your data."
      );
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  return [fetchedData, fetchUser, loading];
}
