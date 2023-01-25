import { useState, useEffect } from "react";
import axios from "axios";

export function useAxios(method, url, body) {
  const [axiosData, setAxiosData] = useState({});

  useEffect(() => {
    if (axiosData !== {}) axiosFetch(method, url, body);
  }, []);

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
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }

  return axiosData;
}
