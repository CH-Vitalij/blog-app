import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div
        id="error-page"
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.data}</i>
        </p>
      </div>
    );
  } else return <div>Something went wrong</div>;
}
