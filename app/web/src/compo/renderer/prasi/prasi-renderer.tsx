import { ReactElement, useEffect } from "react";
import { createRouter } from "web-init";
import { useGlobal } from "web-utils";
import { Renderer } from "../base/renderer";
import { RendererGlobal } from "../base/renderer-global";
import { PRASI_PAGE } from "../base/renderer-types";
import { Loading } from "./ui/loading";

const w = window as unknown as {
  globalValueID: WeakMap<any, string>;
};

export class Prasi extends Renderer {
  rg = useGlobal(RendererGlobal, "PRASI_SITE");

  constructor(arg: {
    component?: {
      loading?: (rg: typeof RendererGlobal) => ReactElement;
      notfound?: (rg: typeof RendererGlobal) => ReactElement;
    };
    load: {
      site: (rg: typeof RendererGlobal) => Promise<{ id: string }>;
      page: (
        rg: typeof RendererGlobal,
        id: string
      ) => Promise<Required<PRASI_PAGE> | null>;
      pages: (rg: typeof RendererGlobal) => Promise<Record<string, PRASI_PAGE>>;
    };
  }) {
    super();
    const rg = this.rg;
    rg.ui.loading = arg.component?.loading ? (
      arg.component?.loading(rg)
    ) : (
      <Loading />
    );

    rg.ui.notfound = arg.component?.notfound ? (
      arg.component?.notfound(rg)
    ) : (
      <div className="flex flex-1 justify-center items-center">
        Page Not Found
      </div>
    );

    rg.page.load = async (page_id) => {
      return await arg.load.page(rg, page_id);
    };

    useEffect(() => {
      (async () => {
        if (!rg.site.id) {
          rg.loading = true;
          rg.render();
          rg.site = await arg.load.site(rg);
          rg.page.list = await arg.load.pages(rg);
          rg.page.router = createRouter();

          for (const page of Object.values(rg.page.list)) {
            rg.page.router.insert(page.url, page);
          }

          rg.loading = false;
          rg.render();
        }
      })();
    }, []);
  }
}
