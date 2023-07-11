import { createId } from "@paralleldrive/cuid2";
import { createContext, startTransition, useContext, useEffect } from "react";

const w = window as unknown as {
  globalValueID: WeakMap<any, string>;
};

export const GlobalContext = createContext({
  global: {} as Record<string, any>,
  render: () => {},
});
export const useGlobal = <T extends object>(
  defaultValue: T,
  effectOrID?:
    | (() => Promise<void | (() => void)> | void | (() => void))
    | string,
  id?: string
): T & { render: () => void } => {
  if (!w.globalValueID) w.globalValueID = new WeakMap();

  let _id = (typeof effectOrID === "string" ? effectOrID : id) as string;
  if (!_id) {
    if (!w.globalValueID.has(defaultValue)) {
      w.globalValueID.set(defaultValue, createId());
    }
    _id = w.globalValueID.get(defaultValue) || "";
  }
  if (!_id) {
    _id = "GLOBAL_DEFAULT";
  }

  const ctx = useContext(GlobalContext);
  const { global, render } = ctx;

  if (!global[_id]) {
    global[_id] = JSON.parse(JSON.stringify(defaultValue));
  }
  useEffect(() => {
    let res: any = null;
    if (typeof effectOrID === "function") {
      try {
        res = effectOrID();
      } catch (e) {
        console.log(e);
      }
    }
    return () => {
      if (typeof res === "function") res();
      else if (res instanceof Promise) {
        res.then((e) => {
          if (typeof e === "function") e();
        });
      }
    };
  }, []);

  const res = global[_id];
  res.render = () => {
    startTransition(render);
  };

  return res as any;
};
