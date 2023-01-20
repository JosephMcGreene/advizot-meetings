import { useContext } from "react";
import { UserContext } from "../../App";
import { Navigate } from "react-router-dom";

export default function UsersOnly({ children }) {
  const currentUser = useContext(UserContext);

  if (!currentUser) return <Navigate to="/" />;

  // child is <PresentUsersOnly />
  return children;
}
