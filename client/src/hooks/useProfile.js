import { useEffect, useState } from "react";
// External
import { useLocation } from "react-router-dom";
// Hooks
import useToasts from "./useToasts";
// Internal
import { axiosFetch } from "../helpers";

export default function useProfile() {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [signInHistory, setSignInHistory] = useState([]);
  const { showToast } = useToasts();

  const location = useLocation();
  const profileID = location.pathname.split("/")[2];

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      setLoading(true);

      const { data } = await axiosFetch("post", "/profile", { profileID });
      const fullProfile = data;

      setUserInfo(fullProfile.userInfo);
      setSignInHistory(fullProfile.signInHistory);
    } catch (err) {
      await showToast("failure", "Something went wrong, unable to fetch data.");
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  return [loading, signInHistory, userInfo];
}
