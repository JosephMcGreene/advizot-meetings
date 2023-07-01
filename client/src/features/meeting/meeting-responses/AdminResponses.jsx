import { useState } from "react";
//External
import { motion } from "framer-motion";
//Components
import RoomCodeDisplay from "../room-code/RoomCodeDisplay";
import ActionsMenu from "../user-actions/ActionsMenu";
import EditPanel from "../user-actions/EditPanel";

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
  const [adminEditPanelShown, setAdminEditPanelShown] = useState(false);

  return (
    <tr className="admin-response-row">
      <th scope="row">{userResponseBody.userName}</th>
      <td>{userResponseBody.priority.substring(1)}</td>
      <td>{userResponseBody.business}</td>
      <td>{userResponseBody.personal}</td>
      <td>{userResponseBody.relationships}</td>
      <td>{userResponseBody.monthlyIssue}</td>
      <td>{userResponseBody.monthlyGoal}</td>
      <td className="admin-actions-container">
        <ActionsMenu
          actionToggle={() => setAdminEditPanelShown(!adminEditPanelShown)}
          className="admin-response-actions"
        >
          {adminEditPanelShown && <EditPanel />}
        </ActionsMenu>
      </td>
    </tr>
  );
}
