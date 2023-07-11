import * as swc from "@swc/core";
import Visitor from "./swc/visitor";

export const traverse = async (
  source: string,
  params: (parent: Visitor) => Partial<InstanceType<typeof Visitor>>
) => {
  const parsed = await swc.parse(source, {
    syntax: "typescript",
    tsx: true,
    target: "es2022",
    script: true,
  });

  class Traverse extends Visitor {
    constructor() {
      super();

      const result = params(
        new Proxy(
          {},
          {
            get: (target, p, receiver) => {
              return this._parent(p as any);
            },
          }
        ) as any
      );
      for (const [k, v] of Object.entries(result)) {
        (this as any)[k] = v;
      }
    }
    _parent(name: keyof Visitor) {
      return super[name];
    }
  }

  new Traverse().visitModule(parsed);
};
