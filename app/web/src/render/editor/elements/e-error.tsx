import { useErrorBoundary, withErrorBoundary } from "react-use-error-boundary";
import { useGlobal, useLocal } from "web-utils";
import { EditorGlobal, ItemMeta } from "../logic/global";

export const ErrorBox = withErrorBoundary(
  ({ children, meta, id }: { children: any; meta?: ItemMeta; id?: string }) => {
    const local = useLocal({ retrying: false });
    const [error, resetError] = useErrorBoundary((error, errorInfo) => {
      console.warn(error);
    });

    let _meta = meta;
    if (id) {
      const p = useGlobal(EditorGlobal, "EDITOR");
      _meta = p.treeMeta[id];
    }

    if (error) {
      return (
        <div className="bg-red-100 border border-red-300 rounded-sm text-xs flex flex-col items-center">
          <div className="text-[10px] font-bold text-red-900 self-stretch px-1">
            ERROR {_meta?.item.name ? "[" + _meta.item.name + "]:" : ""}
          </div>
          <p className="border-b border-red-300 px-1 pb-1 min-w-[100px]">
            {!local.retrying ? <>{(error as any).message}</> : <>Retrying...</>}
          </p>
          <div className="p-1">
            <button
              onClick={() => {
                local.retrying = true;
                local.render();

                setTimeout(() => {
                  local.retrying = false;
                  local.render();
                  resetError();
                }, 100);
              }}
              className="bg-white border border-white hover:border-red-400 hover:bg-red-50 rounded px-2"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return children;
  }
);
