import { transform } from "@swc/core";
import trim from "lodash.trim";

export const _ = {
  url: "/compile-js",
  async api(alljs: string[]) {
    return await Promise.all(
      alljs.map(async (js) => {
        let preped = js.trim();
        if (preped.startsWith("<")) {
          preped = `render(${trim(preped, ";")})`;
        }
        return (
          await transform(preped, {
            jsc: {
              parser: {
                syntax: "typescript",
                tsx: true,
              },
            },
          })
        ).code;
      })
    );
  },
};
