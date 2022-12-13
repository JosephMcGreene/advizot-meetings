import { useContext } from "react";
import { UserContext } from "../../App";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const currentUser = useContext(UserContext);

  if (!currentUser) return <Navigate to="/" />;

  return children;
}
