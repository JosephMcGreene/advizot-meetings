export default function ErrorPage({ error }) {
  return (
    <article>
      <h1>There's been an error...</h1>
      <p>{error.message}</p>
    </article>
  );
}
