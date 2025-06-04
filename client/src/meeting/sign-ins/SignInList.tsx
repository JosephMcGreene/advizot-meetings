// External
import { motion } from "framer-motion";
// Internal
import SignIn from "./SignIn";
// Types
import type { SignIn as signInType } from "../../types/signIn.d.ts";

type Props = {
  deleteSignIn: () => void;
  signIns: signInType[];
  submitSignIn: () => void;
};

export default function SignInList({
  deleteSignIn,
  signIns,
  submitSignIn,
}: Props) {
  return (
    <motion.ul
      className="sign-in-list"
      layout
      transition={{ type: "tween", stiffness: 10, duration: 0.1 }}
    >
      {signIns.map((signIn, index) => (
        <SignIn
          handleDelete={deleteSignIn}
          handleSubmitEdits={submitSignIn}
          key={`${signIn.date}${index}`}
          signInBody={signIn}
        />
      ))}
    </motion.ul>
  );
}
