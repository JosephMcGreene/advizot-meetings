const defaultError = {
  message: "Something went wrong, but it is hard to tell what.",
  request: {
    statusText:
      "This error occurred while authenticating the user with OAuth2.0 and Passport",
  },
};

export default function Error({ error = defaultError }) {
  return (
    <div className="App" style={{ paddingLeft: "1rem", paddingTop: "1rem" }}>
      <h1 style={{ color: "#f5912e" }}>Error</h1>
      <br />
      <h3>
        <u>If you're the developer, maybe this will be helpful:</u>
      </h3>
      <h3 style={{ paddingTop: "0.5rem" }}>{error.message}</h3>
      <h3>{error.request.statusText}</h3>
      <br />
      <p>If you aren't the developer, send them an email or something.</p>
    </div>
  );
}
