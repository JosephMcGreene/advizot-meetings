export default function ErrorFallback({ error, componentStack }) {
  return (
    <div>
      <h1 className="meeting-heading">Oops, look like something went wrong.</h1>
      <pre>{error.message}</pre>
      <pre>{componentStack}</pre>
    </div>
  );
}
