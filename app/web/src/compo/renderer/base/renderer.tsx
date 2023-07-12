import { ReactElement } from "react";
import { RadixRouter } from "web-init";
import { IRoot } from "../../types/root";
import { COMPONENT_ID, COMPONENT_PROPS, PAGE_ID } from "./renderer-types";

type PrasiPage = {
  id: string;
  name: string;
  content_tree: IRoot;
  url: string;
  js_compiled?: string;
};
export abstract class Renderer {
  _internal = {
    ready: false,
    site: null as null | {
      id: string;
      domain: string;
      js_compiled: string;
    },
    pages: {} as Record<string, PrasiPage>,
    components: {} as Record<
      string,
      {
        id: string;
        name: string;
        content_tree: IRoot;
      }
    >,
    router: null as null | RadixRouter<PrasiPage>,
  };

  abstract changePage(page: { id: string; url: string }): Promise<void>;

  renderPage(): ReactElement {
    return <></>;
  }

  renderComponent<K extends COMPONENT_ID>(
    id: K,
    props: COMPONENT_PROPS[K]
  ): ReactElement {
    return <></>;
  }
}
