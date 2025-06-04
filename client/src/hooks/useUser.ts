import { useState, useEffect } from "react";
import useToasts from "./useToasts";
import { axiosFetch } from "../helpers";

export default function useUser(method: string, url: string) {
  const { showToast } = useToasts();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUser(method, url);
  }, [method, url]);

  /**
   * Makes an HTTP request to the server asking for user authentication and information.
   * @param {string} method HTTP verb GET.
   * @param {string} url    Endpoint of the proxy server used to fetch user data.
   */
  async function fetchUser(
    method: string,
    url: string,
    data: object | null = null
  ) {
    try {
      setLoading(true);

      const response = await axiosFetch(method, url, data);
      setUser(response.data);
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

  return [user, fetchUser, loading];
}
