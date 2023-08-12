import { useGlobal } from "web-utils";
import { SSRGlobal } from "../logic/global";
import { SSection } from "./s-section";
import { w } from "../logic/window";
import { initSSR } from "../logic/init";

export const SPage = () => {
  const p = useGlobal(SSRGlobal, "SSR");

  if (!w.ssrContext.ssrLocalEffect["root-page"]) {
    w.ssrContext.ssrLocalEffect["root-page"] = {
      done: false,
      fn: async () => {
        if (p.status === "init") {
          await initSSR(p);
        }
      },
    };
  }

  if (p.status === "init") {
    return null;
  }

  if (!p.page) return null;
  return (
    <div
      className={cx(
        "flex flex-col items-stretch flex-1 bg-white justify-between"
      )}
    >
      {p.page.content_tree.childs.map((e) => (
        <SSection key={e.id} item={e} />
      ))}
    </div>
  );
};
