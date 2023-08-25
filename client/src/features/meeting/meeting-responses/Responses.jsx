import Response from "./Response";

export default function Responses({ responses }) {
  return (
    <section className="responses-section">
      {responses.length === 0 ? (
        <h2>There are no responses right now.</h2>
      ) : (
        <ul className="responses-ul">
          {responses.map((response, index) => {
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
      )}
    </section>
  );
}
