import { useState, useEffect } from "react";
import axios from "axios";

export function useAxios(method, url, body) {
  const [axiosData, setAxiosData] = useState({});

  async function axiosFetch(method, url, body = undefined) {
    try {
      const response = await axios({
        method,
        url,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: body,
        withCredentials: true,
      });

      setAxiosData(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (axiosData !== {}) axiosFetch(method, url, body);
  }, [body, method, url]);

  return axiosData;
}
