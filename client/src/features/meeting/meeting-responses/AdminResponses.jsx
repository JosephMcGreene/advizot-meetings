//External
import { motion } from "framer-motion";
//Components
<<<<<<< HEAD:client/src/components/pages/meeting-responses/AdminResponses.jsx
import RoomCodeDisplay from "../RoomCodeDisplay";
=======
import RoomCodeDisplay from "../room-code/RoomCodeDisplay";
>>>>>>> project-structure:client/src/features/meeting/meeting-responses/AdminResponses.jsx

export default function AdminResponses({ roomCodeDisplayed, sortedResponses }) {
  return (
    <>
      {roomCodeDisplayed && <RoomCodeDisplay />}

      <section className="responses-section">
        <motion.table
          layout
          transition={{ type: "tween", stiffness: 10, duration: 0.1 }}
          className="admin-responses"
        >
          <thead className="admin-response-head">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Priority</th>
              <th scope="col">Business</th>
              <th scope="col">Personal</th>
              <th scope="col">Relationships</th>
              <th scope="col">Issue</th>
              <th scope="col">Goal</th>
            </tr>
          </thead>

          <tbody className="admin-response-body">
            {sortedResponses.map((response) => {
              return (
                <AdminResponse
                  key={
                    response.priority +
                    response.personal +
                    response.business +
                    response.relationships +
                    response.date
                  }
                  userResponseBody={response}
                />
              );
            })}
          </tbody>
        </motion.table>
      </section>
    </>
  );
}

function AdminResponse({ userResponseBody }) {
  return (
    <tr className="admin-response-row">
      <th scope="row">{userResponseBody.userName}</th>
      <td>{userResponseBody.priority.substring(1)}</td>
      <td>{userResponseBody.business}</td>
      <td>{userResponseBody.personal}</td>
      <td>{userResponseBody.relationships}</td>
      <td>{userResponseBody.monthlyIssue}</td>
      <td>{userResponseBody.monthlyGoal}</td>
    </tr>
  );
}
