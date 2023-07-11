import { useEffect, useRef, useState } from "react";

import "../../web-init/src/types";

export const useLocal = <T extends object>(
  data: T,
  effect?: (arg: {
    init: boolean;
  }) => Promise<void | (() => void)> | void | (() => void),
  deps?: any[]
): {
  [K in keyof T]: T[K] extends Promise<any> ? null | Awaited<T[K]> : T[K];
} & { render: () => void } => {
  const [, _render] = useState({});
  const _ = useRef({
    data: data as unknown as T & {
      render: () => void;
    },
    deps: (deps || []) as any[],
    promisedKeys: new Set<string>(),
    ready: false,
    _loading: {} as any,
  });
  const local = _.current;

  useEffect(() => {
    local.ready = true;
    if (effect) effect({ init: true });
  }, []);

  if (local.ready === false) {
    local._loading = {};

    for (const [k, v] of Object.entries(data)) {
      if (!local.promisedKeys.has(k)) {
        let val = v;
        if (typeof val === "object" && val instanceof Promise) {
          local._loading[k] = true;
          local.promisedKeys.add(k);
          (local.data as any)[k] = null;
          val.then((resolved) => {
            (local.data as any)[k] = resolved;
            local._loading[k] = false;
            local.data.render();
          });
        }
      }
    }

    local.data.render = () => {
      if (local.ready) _render({});
    };
  } else {
    if (local.deps.length > 0 && deps) {
      for (const [k, dep] of Object.entries(deps) as any) {
        if (local.deps[k] !== dep) {
          local.deps[k] = dep;

          if (effect) {
            setTimeout(() => {
              effect({ init: false });
            });
          }
          break;
        }
      }
    }
  }

  return local.data as any;
};
