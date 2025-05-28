// TODO Sort check-ins from newest to oldest. As of 5/27/2015, the app automatically sorts them opposite: oldest to newest
// TODO This was helpful for that:
// TODO       console.log(checkInHistory[0].date)
// TODO       console.log(Date.parse(checkInHistory[0].date))

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

  function sortCheckIns(checkIns) {
    return checkIns.sort();
  }

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
