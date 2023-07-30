import { CEGlobal } from "../../../base/global/content-editor";
import importModule from "../../page/tools/dynamic-import";
import { instantiateComp, loadComponents } from "../comp/load-comp";
import { wsdoc } from "../ws/wsdoc";

const w = window as unknown as {
  prasiEditorPage: Record<
    string,
    {
      el: null | HTMLDivElement;
      scroll: null | { t: number; l: number };
    }
  >;
};
if (!w.prasiEditorPage) {
  w.prasiEditorPage = {};
}

export const reloadCE = async (
  ce: typeof CEGlobal & { render: () => void }
) => {
  ce.scope = {
    effect: {},
    evargs: {},
    tree: {},
    types: {},
    value: {},
  };
  ce.instances = {};

  const scroll = { t: 0, l: 0 };
  const p = w.prasiEditorPage[ce.id];
  if (p && p.el) {
    scroll.t = p.el.scrollTop;
    scroll.l = p.el.scrollLeft;
    p.el = null;
    p.scroll = scroll;
  }

  ce.editor.page.reload = true;
  ce.scope = { effect: {}, evargs: {}, tree: {}, types: {}, value: {} };
  ce.editor.page.render();
  await importModule(
    `${serverurl}/npm/site/${wsdoc.site?.id}/index.js?` + Date.now()
  );
  await importModule(
    `${serverurl}/npm/page/${wsdoc.page_id}/index.js?` + Date.now()
  );
  const items = await loadComponents(ce.map.get("content_tree"));
  for (const item of items) {
    instantiateComp(ce, item);
  }

  ce.editor.page.reload = false;
  ce.editor.page.render();
};
