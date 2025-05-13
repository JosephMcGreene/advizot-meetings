// Components
import DataColumn from "./DataColumn";
import NameColumn from "./NameColumn";

export default function SignIn({
  handleDelete,
  handleSubmitEdits,
  signInBody,
}) {
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
