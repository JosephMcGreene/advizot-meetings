// External
import { motion } from "framer-motion";
// Internal
import SignInRow from "./SignInRow";

export default function SignInList({ deleteSignIn, signIns, submitSignIn }) {
  return (
    <motion.ul
      layout
      transition={{ type: "tween", stiffness: 10, duration: 0.1 }}
      className="sign-in-list"
    >
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
    </motion.ul>
  );
}
