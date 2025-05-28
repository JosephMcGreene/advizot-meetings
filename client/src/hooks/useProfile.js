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
   * Sorts the check-ins returned from the server from newest to oldest.
   * @param   {object[]} checkIns The array of check-in objects to sort.
   * @returns {object[]}          A sorted array of check-in objects from the server, from newest to oldest.
   */
  function sortCheckIns(checkIns) {
    return checkIns.sort((a, b) => {
      const dateA = Date.parse(a.date);
      const dateB = Date.parse(b.date);

      if (dateA > dateB) return -1;
      return 1;
    });
  }

  /**
   * Fetches all check-in objects that belong to the user and sets state to display them.
   */
  async function getUserCheckIns() {
    try {
      setLoading(true);

      const existingCheckIns = await axiosFetch("get", "/profile");

      setCheckInHistory(sortCheckIns(existingCheckIns.data));
    } catch (err) {
      await showToast("failure", "Something went wrong, unable to fetch data.");
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  return [checkInHistory, loading];
}
