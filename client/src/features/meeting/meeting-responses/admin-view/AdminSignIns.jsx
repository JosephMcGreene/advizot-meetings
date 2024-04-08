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
    <motion.table
      layout
      transition={{ type: "tween", stiffness: 10, duration: 0.1 }}
      className="admin-sign-ins"
    >
      {signIns.length > 0 && (
        <thead className="admin-head">
          <th className="admin-heading">Name</th>
          <th className="admin-heading">Priority</th>
          <th className="admin-heading">Business</th>
          <th className="admin-heading">Personal</th>
          <th className="admin-heading">Relationships</th>
          <th className="admin-heading">Issue</th>
          <th className="admin-heading">Goal</th>
        </thead>
      )}
      <tbody>
        {signIns.map((signIn, index) => (
          <AdminSignIn
            key={`${signIn.date}${index}`}
            signInBody={signIn}
            handleSubmitEdits={handleSubmitEdits}
            handleDelete={handleDelete}
          />
        ))}
      </tbody>
    </motion.table>
  );
}
