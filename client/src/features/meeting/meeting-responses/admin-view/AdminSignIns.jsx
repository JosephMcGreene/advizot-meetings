//External
import { motion } from "framer-motion";
//Internal
import AdminSignIn from "./AdminSignIn";

export default function AdminSignIns({
  signIns,
  handleSubmitEdits,
  handleDelete,
}) {
  return (
    <motion.section
      layout
      transition={{ type: "tween", stiffness: 10, duration: 0.1 }}
      className="admin-sign-ins"
    >
      {signIns.length > 0 && (
        <ul className="admin-head">
          <li className="admin-heading">Name</li>
          <li className="admin-heading">Priority</li>
          <li className="admin-heading">Business</li>
          <li className="admin-heading">Personal</li>
          <li className="admin-heading">Relationships</li>
          <li className="admin-heading">Issue</li>
          <li className="admin-heading">Goal</li>
        </ul>
      )}
      {signIns.map((signIn, index) => (
        <AdminSignIn
          key={`${signIn.date}${index}`}
          signInBody={signIn}
          handleSubmitEdits={handleSubmitEdits}
          handleDelete={handleDelete}
        />
      ))}
    </motion.section>
  );
}
