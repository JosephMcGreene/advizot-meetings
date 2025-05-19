import { useState, useEffect } from "react";
// Components
import LoadingSpinner from "../shared/LoadingSpinner";
import CheckInList from "../meeting/sign-ins/SignInList";
// Internal
import { axiosFetch } from "../helpers";
import useToasts from "../hooks/useToasts";

export default function SignInsColumn() {
  const [loading, setLoading] = useState(false);
  const [checkInHistory, setCheckInHistory] = useState([]);
  const { showToast } = useToasts();

  useEffect(() => {
    getUserCheckIns();
  }, []);

  async function getUserCheckIns() {
    try {
      setLoading(true);

      const existingCheckIns = await axiosFetch("get", "/profile");

      setCheckInHistory(existingCheckIns.data);
    } catch (err) {
      await showToast("failure", "Something went wrong, unable to fetch data.");
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingSpinner />;

  return (
    <CheckInList
      deleteSignIn={() => console.log("Delete!")}
      signIns={checkInHistory}
      submitSignIn={() => console.log("Submit!")}
    />
  );
}
