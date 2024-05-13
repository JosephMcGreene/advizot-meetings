import SignInCard from "./SignInCard";

export default function SignInsCardView({
  signIns,
  handleSubmitEdits,
  handleDelete,
  signInBelongsToUser,
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
            <SignInCard
              key={`${signIn.date}${index}`}
              signInBody={signIn}
              handleDelete={handleDelete}
              handleSubmitEdits={handleSubmitEdits}
              signInBelongsToUser={signInBelongsToUser}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
