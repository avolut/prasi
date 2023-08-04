import { ReactElement } from "react";
import { PrasiPage } from "./PrasiPage";
import { RendererGlobal } from "./renderer-global";
import { COMPONENT_ID, COMPONENT_PROPS } from "./renderer-types";

export abstract class Renderer {
  abstract rg: typeof RendererGlobal & { render: () => void };

  renderPage(pathname: string): ReactElement {
    return <PrasiPage rg={this.rg} pathname={pathname} />;
  }

  renderComponent<K extends COMPONENT_ID>(
    id: K,
    props: COMPONENT_PROPS[K]
  ): ReactElement {
    return <></>;
  }
}
