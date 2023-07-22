import Response from "./Response";

export default function Responses({ sortedResponses, onDelete }) {
  return (
    <section className="responses-section">
      {sortedResponses.length === 0 ? (
        <h2>There are no responses right now.</h2>
      ) : (
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
                onDelete={onDelete}
              />
            );
          })}
        </ul>
      )}
    </section>
  );
}
