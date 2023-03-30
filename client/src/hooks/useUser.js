import { useState, useEffect } from "react";
import { axiosFetch } from "../helpers";

export default function useUser(method, url, data = null) {
  const [fetchedData, setFetchedData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      fetchData(method, url, data);
    } catch (err) {
      setError(err);
      throw err;
    }
  }, [method, url, data]);

  async function fetchData(method, url, data = null) {
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

  return [fetchedData, fetchData, loading, error];
}
