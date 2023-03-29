import { useState } from "react";
//Hooks
import useAxios from "./useAxios";

export default function useResponses(method, url, data = null) {
  const [responses, setResponses, fetchResponses] = useAxios(method, url);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function submitResponse(responseToSubmit) {
    try {
      setLoading(true);

      const serverResponse = await fetchResponses(
        "post",
        "/db/responses",
        responseToSubmit
      );

      const newResponses = responses.filter(
        (response) => response._id !== responseToSubmit._id
      );

      newResponses.push(serverResponse.data);
      setResponses(newResponses);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  const sortedResponses = responses.sort((a, b) => {
    if (a.priority < b.priority) return -1;
    return 1;
  });

  return [sortedResponses, submitResponse, loading, error];
}
