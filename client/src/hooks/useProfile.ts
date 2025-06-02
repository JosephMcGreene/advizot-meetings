import { useEffect, useState } from "react";
// Hooks
import useToasts from "./useToasts";
// Internal
import { axiosFetch } from "../helpers";

export default function useProfile() {
  const [loading, setLoading] = useState(false);
  const [checkInHistory, setCheckInHistory] = useState([]);
  const { showToast } = useToasts();

  useEffect(() => {
    getUserCheckIns();
  }, []);

  /**
   * Fetches all check-in objects that belong to the user and sets state to display them.
   */
  async function getUserCheckIns() {
    try {
      setLoading(true);

      const existingCheckIns = await axiosFetch("get", "/profile");

      setCheckInHistory(existingCheckIns.data.reverse()); // Display newest to oldest
    } catch (err) {
      await showToast("failure", "Something went wrong, unable to fetch data.");
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  return [checkInHistory, loading];
}
