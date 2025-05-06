// External
import { motion } from "framer-motion";
// Internal
import SignInRow from "./SignInRow";

export default function SignInList({ deleteSignIn, signIns, submitSignIn }) {
  return (
    <motion.table
      layout
      transition={{ type: "tween", stiffness: 10, duration: 0.1 }}
      className="meeting-table"
    >
      {signIns.length > 0 && (
        <thead className="thead">
          <th className="table-heading">Name</th>
          <th className="table-heading">Sign-In</th>
        </thead>
      )}
      <tbody className="tbody">
        {signIns.map((signIn, index) => (
          <SignInRow
            key={`${signIn.date}${index}`}
            signInBody={signIn}
            handleSubmitEdits={async (signInToSubmit, existingSignIn) => {
              await submitSignIn(signInToSubmit, existingSignIn);
            }}
            handleDelete={async (signInID) => {
              await deleteSignIn(signInID);
            }}
          />
        ))}
      </tbody>
    </motion.table>
  );
}
