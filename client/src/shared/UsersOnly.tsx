import { useContext, ReactNode } from "react";
import { UserContext } from "../App";
// External
import { Navigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export default function UsersOnly({ children }: Props): ReactNode {
  const user = useContext(UserContext);

  if (!user) return <Navigate to="/" />;

  return children;
}
