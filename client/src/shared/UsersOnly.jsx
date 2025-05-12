import { useContext } from "react";
import { UserContext } from "../App";
// External
import { Navigate } from "react-router-dom";

export default function UsersOnly({ children }) {
  const user = useContext(UserContext);

  if (!user) return <Navigate to="/" />;

  return children;
}
