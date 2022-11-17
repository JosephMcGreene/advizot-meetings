import { useContext } from "react";
import { UserContext } from "../../App";
//Internal
import LoadingSpinner from "../utilities/LoadingSpinner";
import Response from "./Response";

export default function Responses({
  responses,
  loading,
  onSubmitEdits,
  onDelete,
}) {
  const currentUser = useContext(UserContext);

  //Sort responses to be displayed in order of priority
  const sortedResponses = responses.sort((a, b) => {
    if (a.priority < b.priority) return -1;
    return 1;
  });

  return (
    <>
      {/* Only show Responses header if there are responses to display */}
      {responses.length > 0 ? (
        <h2 className="responses-heading">Hello, {currentUser.firstName}!</h2>
      ) : (
        ""
      )}

      {/* If Promises in fetching are pending, render a loading animation */}
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
