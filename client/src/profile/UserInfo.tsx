import { useContext } from "react";
import { UserContext } from "../App";
// Types
import { User } from "../types/user";

export default function UserInfo() {
  const user: User = useContext(UserContext);

  return (
    <article className="user-info-column">
      <h1 className="centered-heading">
        {user.firstName} {user.lastName}
      </h1>
    </article>
  );
}
