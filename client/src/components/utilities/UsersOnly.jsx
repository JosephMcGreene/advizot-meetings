import { useContext } from "react";
//External
import { Navigate } from "react-router-dom";
//Internal
import { UserContext } from "../../App";

export default function UsersOnly({ children }) {
  const currentUser = useContext(UserContext);

  if (!currentUser) return <Navigate to="/" />;

  // child is <PresentUsersOnly />
  return children;
}
