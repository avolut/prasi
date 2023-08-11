import { ReactElement, ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { useGlobal } from "web-utils";

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

// const streamToString = (el: ReactElement) => {
//   return new Promise<string>((resolve) => {
//     let str = "";
//     const Writable = (w.stream as any).Writable as any;
//     const writable = new Writable({
//       write(chunk: any, encoding: any, callback: any) {
//         str += chunk.toString();
//         callback();
//       },
//     });
//     writable.on("finish", () => {
//       resolve(str);
//     });
//     const stream = renderToPipeableStream(el, {
//       onShellReady() {
//         stream.pipe(writable);
//       },
//     });
//   });
// };
