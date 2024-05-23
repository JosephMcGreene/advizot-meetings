import { useState } from "react";
import { axiosFetch } from "../helpers";

export default function useCheckIns() {
  const [loading, setLoading] = useState(false);

  async function submitCheckIn(checkInToSubmit) {
    try {
      setLoading(true);

      checkInToSubmit.isCheckIn = true;

      const response = await axiosFetch("put", "/signIns", checkInToSubmit);
      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return [loading, submitCheckIn];
}
