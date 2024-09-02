import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.data}</i>
        </p>
      </div>
    );
  } else
    return (
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Something went wrong
      </h1>
    );
}
