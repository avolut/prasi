import { CEGlobal } from "../../../base/global/content-editor";
import { instantiateComp, loadComponents } from "../comp/load-comp";

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

export const reloadCE = (ce: typeof CEGlobal & { render: () => void }) => {
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

  loadComponents(ce.map.get("content_tree")).then((items) => {
    for (const item of items) {
      instantiateComp(ce, item);
    }

    ce.editor.page.reload = false;
    ce.editor.page.render();
  });
};
