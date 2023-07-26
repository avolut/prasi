import { CEGlobal } from "../../../base/global/content-editor";
import { instantiateComp, loadComponents } from "../comp/load-comp";

export const reloadCE = (ce: typeof CEGlobal & { render: () => void }) => {
  ce.scope = {
    effect: {},
    evargs: {},
    tree: {},
    types: {},
    value: {},
  };
  ce.instances = {};
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
