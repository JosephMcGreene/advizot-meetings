import AdminResponse from "./AdminResponse";
import LoadingSpinner from "../../utilities/LoadingSpinner";

export default function AdminResponses({ sortedResponses, loading }) {
  if (loading) return <LoadingSpinner />;
  return (
    <table className="admin-responses">
      <thead className="admin-response-head">
        <th>Name</th>
        <th>Priority</th>
        <th>Business</th>
        <th>Personal</th>
        <th>Relationships</th>
        <th>Issue</th>
        <th>Goal</th>
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
    </table>
  );
}
