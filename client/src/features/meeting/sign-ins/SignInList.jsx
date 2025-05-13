// External
import { motion } from "framer-motion";
// Internal
import SignIn from "./SignIn";

export default function SignInList({ deleteSignIn, signIns, submitSignIn }) {
  return (
    <motion.ul
      className="sign-in-list"
      layout
      transition={{ type: "tween", stiffness: 10, duration: 0.1 }}
    >
      {signIns.map((signIn, index) => (
        <SignIn
          handleDelete={async (signInID) => {
            await deleteSignIn(signInID);
          }}
          handleSubmitEdits={async (signInToSubmit, existingSignIn) => {
            await submitSignIn(signInToSubmit, existingSignIn);
          }}
          key={`${signIn.date}${index}`}
          signInBody={signIn}
        />
      ))}
    </motion.ul>
  );
}
