import { ErrorBoundary } from "web-init";

export const ErrorBox = ({ children, id }: { children: any; id: string }) => {
  return <ErrorBoundary>{children}</ErrorBoundary>;
};
