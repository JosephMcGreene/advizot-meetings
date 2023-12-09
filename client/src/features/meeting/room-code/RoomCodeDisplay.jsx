import { motion } from "framer-motion";

export default function RoomCodeDisplay() {
  const roomCode = localStorage.getItem("roomCode");

  return (
    <motion.aside
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="room-code-display"
    >
      <h2>{roomCode}</h2>
    </motion.aside>
  );
}
