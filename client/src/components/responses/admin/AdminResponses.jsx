import AdminResponse from "./AdminResponse";
import LoadingSpinner from "../../utilities/LoadingSpinner";

export default function AdminResponses({ sortedResponses, onDelete, loading }) {
  if (loading) return <LoadingSpinner />;
  return (
    <table className="admin-responses">
      <thead className="admin-response-head">
        <tr>
          <th scope="col">Name</th>
          <th scope="col" style={{ width: 0, padding: 0, border: 0 }}></th>
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
              onDelete={onDelete}
              userResponseBody={response}
            />
          );
        })}
      </tbody>
    </table>
  );
}
