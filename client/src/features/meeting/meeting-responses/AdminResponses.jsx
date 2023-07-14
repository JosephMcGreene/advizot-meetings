//External
import { motion } from "framer-motion";
//Components
import AdminResponse from "./AdminResponse";
import RoomCodeDisplay from "../room-code/RoomCodeDisplay";

export default function AdminResponses({
  roomCodeDisplayed,
  visibleResponses,
}) {
  return (
    <>
      {roomCodeDisplayed && <RoomCodeDisplay />}
      {console.log(visibleResponses)}

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
            {visibleResponses.map((response, index) => {
              return (
                <AdminResponse
                  key={
                    response.priority +
                    response.personal +
                    response.business +
                    response.relationships +
                    index
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
