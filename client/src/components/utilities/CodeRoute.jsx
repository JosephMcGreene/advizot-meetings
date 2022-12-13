import { useContext } from "react";
import { UserContext } from "../../App";
import { Navigate } from "react-router-dom";

export default function CodeRoute({ hasCorrectCode, children }) {
  const currentUser = useContext(UserContext);

  if (!currentUser) return <Navigate to="/" />;

  if (!hasCorrectCode) {
    return <Navigate to="/meetingCode" />;
  }

  return children;
}
