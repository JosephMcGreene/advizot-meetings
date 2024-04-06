import MemberSignIn from "./MemberSignIn";

export default function MemberSignIns({
  signIns,
  handleSubmitEdits,
  handleDelete,
}) {
  return (
    <section className="sign-ins-section">
      {signIns.length === 0 ? (
        <h2 className="centered-heading">
          There is no one signed in right now.
        </h2>
      ) : (
        <ul className="sign-ins-ul">
          {signIns.map((signIn, index) => (
            <MemberSignIn
              key={`${signIn.date}${index}`}
              signInBody={signIn}
              handleDelete={handleDelete}
              handleSubmitEdits={handleSubmitEdits}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
