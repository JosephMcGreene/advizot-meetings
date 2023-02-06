import LoadingSpinner from "../../utilities/LoadingSpinner";
import Response from "./Response";

export default function Responses({
  sortedResponses,
  loading,
  onSubmitEdits,
  onDelete,
}) {
  return (
    <>
      {loading ? (
        <LoadingSpinner color="orange" />
      ) : (
        <ul className="responses-ul">
          {sortedResponses.map((response) => {
            return (
              <Response
                key={
                  response.priority +
                  response.personal +
                  response.business +
                  response.relationships +
                  response.date
                }
                userResponseBody={response}
                onSubmitEdits={onSubmitEdits}
                onDelete={onDelete}
              />
            );
          })}
        </ul>
      )}
    </>
  );
}
