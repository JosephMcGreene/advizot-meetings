import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1 className="welcome">Oops!</h1>
      <p className="text-input">
        Sorry, an unexpected error has occurred. If you're the developer, maybe
        this will be helpful:
      </p>
      <p className="text-input">
        <i>{error.statusText || error.message}</i>
      </p>

      <p className="text-input">
        You can also check the console for more information.
      </p>
    </div>
  );
}
