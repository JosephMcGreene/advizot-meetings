import { useContext } from "react";
import { UserContext } from "../App";

export default function UserInfo() {
  const user = useContext(UserContext);

  return (
    <article className="user-info-column">
      <h1 className="centered-heading">
        {user.firstName} {user.lastName}
      </h1>
    </article>
  );
}
