import { useContext } from "react";
import { UserContext } from "../App";
// Types
import type { User } from "../types/user.d.ts";

export default function UserInfo() {
  const user: User | null = useContext(UserContext);

  return (
    <article className="user-info">
      <h1 className="centered-heading">
        {user.firstName} {user.lastName}
      </h1>
    </article>
  );
}
