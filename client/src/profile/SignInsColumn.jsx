import { useState, useEffect } from "react";
// Components
import LoadingSpinner from "../shared/LoadingSpinner";
// Internal
import { axiosFetch } from "../helpers";
import useToasts from "../hooks/useToasts";

export default function SignInsColumn({ userID }) {
  const [loading, setLoading] = useState(false);
  const [signInHistory, setSignInHistory] = useState([]);
  const { showToast } = useToasts();

  useEffect(() => {
    getUserSignIns();
  }, []);

  async function getUserSignIns() {
    try {
      setLoading(true);

      const existingSignIns = await axiosFetch("get", "/profile");

      setSignInHistory(existingSignIns.data);
    } catch (err) {
      await showToast("failure", "Something went wrong, unable to fetch data.");
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingSpinner />;

  return <article>{signInHistory}</article>;
}
