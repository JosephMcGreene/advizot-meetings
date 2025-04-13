//External
import { motion } from "framer-motion";
//Internal
import SignInTableRow from "./SignInTableRow";

export default function SignInsTableView({
  signIns,
  handleSubmitEdits,
  signInBelongsToUser,
  handleDelete,
}) {
  return (
    <motion.table
      layout
      transition={{ type: "tween", stiffness: 10, duration: 0.1 }}
      className="admin-sign-ins-table"
    >
      {signIns.length > 0 && (
        <thead className="thead">
          <th className="table-heading">Name</th>
          <th className="table-heading">Priority</th>
          <th className="table-heading">Business</th>
          <th className="table-heading">Personal</th>
          <th className="table-heading">Relationships</th>
          <th className="table-heading">Issue</th>
          <th className="table-heading">Goal</th>
        </thead>
      )}
      <tbody className="tbody">
        {signIns.map((signIn, index) => (
          <SignInTableRow
            key={`${signIn.date}${index}`}
            signInBody={signIn}
            handleSubmitEdits={handleSubmitEdits}
            signInBelongsToUser={signInBelongsToUser}
            handleDelete={handleDelete}
          />
        ))}
      </tbody>
    </motion.table>
  );
}
