import { useContext } from "react";
import { UserContext } from "../App";

export default function SignInsColumn() {
  const user = useContext(UserContext);

  return <article>This is the data column</article>;
}
