import { FC } from "react";
import { EItem } from "./e-item";
import { ERender } from "./e-render";
import { ErrorBoundary } from "web-init";

export const ESection: FC<{ id: string }> = ({ id }) => {
  return (
    <ErrorBoundary>
      <ERender id={id}>
        {(childs) =>
          childs.map((e) => {
            return <EItem id={e.id} key={e.id} />;
          })
        }
      </ERender>
    </ErrorBoundary>
  );
};
