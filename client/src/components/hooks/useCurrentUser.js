import { useState, useEffect } from "react";
import { useAxios } from "./useAxios";

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState(null);
  const user = useAxios("get", "/auth/current_user");

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  return null || currentUser;
}
