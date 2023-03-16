import { useContext } from "react";
//External
import { Navigate } from "react-router-dom";
//Context
import { UserContext } from "../../App";

export default function UsersOnly({ children }) {
  const user = useContext(UserContext);

  if (!user) return <Navigate to="/" />;
  // child is <PresentUsersOnly />
  return children;
}
