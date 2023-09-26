import { ErrorBoundary } from "web-init";
import { useGlobal, useLocal } from "web-utils";
import { EditorGlobal } from "../logic/global";
import { createElProp } from "./e-relprop";

export const ErrorBox = ({ children, id }: { children: any; id: string }) => {
  const local = useLocal({
    error: false,
    prev: false,
    timeout: null as any,
    recheck: false,
  });
  const p = useGlobal(EditorGlobal, "EDITOR");

  if (local.error) {
    const meta = p.treeMeta[id];
    const elprop = createElProp(meta.item, p);

    if (!local.recheck) {
      clearTimeout(local.timeout);
      local.timeout = setTimeout(() => {
        local.recheck = true;
        local.render();
      }, 1000);
    }

    return (
      <div {...elprop}>
        <div className="text-xs p-2 rounded-md bg-red-100">
          ERROR: {meta?.item.name}
        </div>
        {local.recheck && (
          <ErrorBoundary
            showError={false}
            onError={() => {
              local.error = true;
              local.timeout = setTimeout(local.render);
            }}
            onSuccess={() => {
              local.error = false;
              local.timeout = setTimeout(local.render);
            }}
          >
            {children}
          </ErrorBoundary>
        )}
      </div>
    );
  }
  return (
    <ErrorBoundary
      showError={false}
      onError={() => {
        local.recheck = false;
        local.error = true;
        local.timeout = setTimeout(local.render);
      }}
    >
      {children}
    </ErrorBoundary>
  );
};
