//Components
import Response from "./Response";

export default function Responses({ sortedResponses }) {
  return (
    <section className="responses-section">
      <ul className="responses-ul">
        {sortedResponses.map((response, index) => {
          return (
            <Response
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
      </ul>
    </section>
  );
}