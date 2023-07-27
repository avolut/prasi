import { CEGlobal } from "../../../base/global/content-editor";
import { instantiateComp, loadComponents } from "../comp/load-comp";

const w = window as unknown as {
  editorPageEl: null | HTMLDivElement;
  editorPageScroll: null | { t: number; l: number };
};

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
  if (w.editorPageEl) {
    scroll.t = w.editorPageEl.scrollTop;
    scroll.l = w.editorPageEl.scrollLeft;
    w.editorPageEl = null;
    w.editorPageScroll = scroll;
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
