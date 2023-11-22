import { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../../App";

export default function RoomCodeDisplay() {
  const isDark = useContext(ThemeContext);
  const roomCode = localStorage.getItem("roomCode");

  return (
    <motion.aside
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={isDark ? "room-code-display dark" : "room-code-display"}
    >
      <h2>{roomCode}</h2>
    </motion.aside>
  );
}
