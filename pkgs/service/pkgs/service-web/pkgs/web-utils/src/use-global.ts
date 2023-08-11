import { createId } from "@paralleldrive/cuid2";
import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
} from "react";

const w = window as unknown as {
  globalValueID: WeakMap<any, string>;
};

export const GlobalContext = createContext({
  global: {},
  render: () => {},
  ssrMapEffect: {},
  ssrShouldRender: false,
} as {
  global: Record<string, any>;
  render: () => void;
  ssrMapEffect?: Record<string, (() => void)[]>;
  ssrShouldRender?: boolean;
});
export const uState = useState;
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
    global[_id] = deepClone(defaultValue);
  }

  const effect = () => {
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
  };
  if (isSSR) {
    if (typeof effectOrID !== "string" && typeof id !== "string") {
      console.error("useGlobal id is required when rendering in SSR");
    } else {
      if (!ctx.ssrMapEffect) {
        ctx.ssrMapEffect = {};
      }
      if (!ctx.ssrMapEffect[_id]) ctx.ssrMapEffect[_id] = [];
      ctx.ssrMapEffect[_id].push(effect);
    }
  } else {
    useEffect(effect, []);
  }

  const res = global[_id];
  res.render = () => {
    if (isSSR) {
      ctx.ssrShouldRender = true;
    } else {
      startTransition(render);
    }
  };

  return res as any;
};
const deepClone = (object: any): any => {
  if (null == object || typeof object != "object") return object;
  // Handle Date
  if (object instanceof Date) {
    var copy = new Date();
    copy.setTime(object.getTime());
    return copy;
  }
  if (object instanceof Array) {
    return object.map((item) => deepClone(item));
  }

  var newObject: any = {};
  for (var key in object) {
    if (typeof object[key] === "object") {
      newObject[key] = deepClone(object[key]);
    } else {
      newObject[key] = object[key];
    }
  }
  return newObject as any;
};
