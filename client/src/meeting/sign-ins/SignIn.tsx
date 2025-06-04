// Components
import DataColumn from "./DataColumn";
import NameColumn from "./NameColumn";
// Types
import type { SignIn } from "../../types/signIn.d.ts";

type Props = {
  handleDelete: () => void;
  handleSubmitEdits: () => void;
  signInBody: SignIn;
};

export default function SignIn({
  handleDelete,
  handleSubmitEdits,
  signInBody,
}: Props) {
  return (
    <li className="sign-in-item">
      <NameColumn
        handleDelete={handleDelete}
        handleSubmitEdits={handleSubmitEdits}
        signInBody={signInBody}
      />

      <DataColumn signInBody={signInBody} />
    </li>
  );
}
