import { useState, useEffect } from "react";
//Internal
import { axiosFetch } from "../helpers";
import useToasts from "./useToasts";

export default function useProfile(userID) {
  const { showToast } = useToasts();
  const [profileInfo, setProfileInfo] = useState("");
  const [signIns, setSignIns] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfileData("post", "/profile", setProfileInfo);
    fetchProfileData("post", "/profile/signIns", setSignIns);
  }, []);

  /**
   * Fetches user profile data from the server and sets the appropriate state that corresponds to the data that was fetched
   *
   * @param {String}   method   HTTP method being used to fetch data
   * @param {String}   url		Back end route to make request to
   * @param {Function} setState State setter function called to update the appropriate state
   */
  async function fetchProfileData(method, url, setState) {
    try {
      setLoading(true);

      const { data } = await axiosFetch(method, url, { userID });

      setState(data);
    } catch (err) {
      await showToast("failure", "Something went wrong, unable to fetch data.");
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  return [profileInfo, signIns, loading];
}
