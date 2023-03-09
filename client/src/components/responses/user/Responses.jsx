//Components
import Response from "./Response";

export default function Responses({ sortedResponses }) {
  return (
    <>
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
            />
          );
        })}
      </ul>
    </>
  );
}
