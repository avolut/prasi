import { renderToPipeableStream } from "react-dom/server";
import { ReactElement, ReactNode } from "react";
import { w } from "./ssr-window";

export const scope = {
  value: {} as Record<string, any>,
  effect: {} as Record<string, true>,
  render: {
    count: 0,
    execute: async () => {},
  },
};

export const Local = <T extends Record<string, any>>({
  id,
  children,
  effect,
  value,
}: {
  id: string;
  children: ReactNode;
  effect?: (arg: T & { render: () => void }) => any;
  value: T;
}) => {
  if (!scope.value[id]) {
    scope.value[id] = {
      ...value,
    };
  }
  scope.value[id].render = () => {
    scope.render.count++;
    scope.render.execute();
  };

  if (effect && !scope.effect[id]) {
    scope.effect[id] = true;
    effect(scope.value[id]);
  }

  return children;
};

export const renderSSR = async (
  el: ReactElement,
  opt?: { maxRender?: number; timeout?: number }
) => {
  const maxRender = opt?.maxRender || 100;
  const timeout = opt?.timeout || 500;

  const result = {
    value: "",
    resolve: () => {},
    timeout: null as any,
    rendered: false,
  };

  await new Promise<void>(async (resolve) => {
    result.resolve = resolve;

    scope.render.execute = async () => {
      result.value = await streamToString(el);
      if (scope.render.count >= maxRender) {
        clearTimeout(result.timeout);
        result.rendered = true;
        result.resolve();
      }
    };
    await scope.render.execute();
    result.timeout = setTimeout(() => {
      if (!result.rendered) {
        result.rendered = true;
        result.resolve();
      }
    }, timeout);
  });

  return result.value;
};

const streamToString = (el: ReactElement) => {
  return new Promise<string>((resolve) => {
    let str = "";
    const Writable = (w.stream as any).Writable as any;
    const writable = new Writable({
      write(chunk: any, encoding: any, callback: any) {
        str += chunk.toString();
        callback();
      },
    });
    writable.on("finish", () => {
      resolve(str);
    });
    const stream = renderToPipeableStream(el, {
      onShellReady() {
        stream.pipe(writable);
      },
    });
  });
};
