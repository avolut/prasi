import { Component, ReactNode } from "react";

type ErrorBoundaryState = {
  error: Error | null;
  errorInfo: any;
};
export class ErrorBoundary extends Component<
  {
    children: ReactNode;
    onError?: (error: any) => void;
    onSuccess?: () => void;
  },
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch = (error: any, errorInfo: any) => {
    catchFunc(error, errorInfo, this);
  };

  render() {
    if (this.state.errorInfo) {
      if (this.props.onError) {
        this.props.onError(this.state.errorInfo);
      }
      return handleError(this);
    }
    if (this.props.onSuccess) {
      this.props.onSuccess();
    }

    return this.props.children || <div></div>;
  }
}

const handleError = (ctx: any) => {
  const err = (ctx.state.error && ctx.state.error.toString()) || "";
  if (err.includes("Failed to fetch dynamically imported module")) {
    return (
      <>
        <div className="absolute flex max-w-md m-5 bg-white rounded-lg shadow-lg pointer-events-auto inset-5 ring-1 ring-black ring-opacity-5">
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  ></path>
                </svg>
              </div>
              <div className="flex-1 w-0 ml-3">
                <p className="text-sm font-medium text-gray-900">
                  Page need to be reloaded.
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Some module unable to load, you have to reload this page.
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              className="flex items-center justify-center w-full p-4 text-sm font-medium text-blue-600 border border-transparent rounded-none rounded-r-lg hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => {
                if (!isSSR && typeof location === "object") location.reload();
              }}
            >
              Reload
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    // Error path
    <div style={ctx.props.style || styles.error}>
      <h2>Something went wrong.</h2>
      <details
        className={cx(
          "p-2 overflow-auto text-sm whitespace-pre-wrap",
          css`
            font-family: monospace, monospace;
            font-size: 11px;
            background-color: #ececeb58;
          `
        )}
      >
        {ctx.state.error && ctx.state.error.toString()}
        <br />
        <br />
        <div>{ctx.state.errorInfo.componentStack}</div>
      </details>
    </div>
  );
};

const catchFunc = (error: Error, errorInfo: any, ctx: any) => {
  // catch errors in any components below and re-render with error message
  ctx.setState({
    error: error,
    errorInfo: errorInfo,
  });
  // log error messages, etc.
};

const styles = {
  error: {
    backgroundColor: "#f98e7e",
    borderTop: "1px solid #777",
    borderBottom: "1px solid #777",
    padding: "15px",
  },
};
