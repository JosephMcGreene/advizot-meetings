import { motion } from "framer-motion";

export default function PasscodeDisplay() {
  const passcode = localStorage.getItem("passcode");

  return (
    <motion.aside
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="passcode-display"
    >
      <h2>{passcode}</h2>
    </motion.aside>
  );
}
