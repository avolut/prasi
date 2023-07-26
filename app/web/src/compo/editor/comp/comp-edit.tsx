import { FC, useCallback } from "react";
import { useGlobal, useLocal } from "web-utils";
import { CEGlobal, CompDoc } from "../../../base/global/content-editor";
import { component } from "../../page/component";
import { MItem } from "../../types/item";
import { Loading } from "../../ui/loading";
import { Modal } from "../../ui/modal";
import { ContentEditor } from "../content";
import { editorStyle } from "../style";
import { CompTab } from "./comp-tab";
import {
  componentShouldLoad,
  instantiateComp,
  loadComponents,
} from "./load-comp";
import { reloadCE } from "../tools/reload-ce";

export const CECompEdit: FC<{ id: string }> = ({ id }) => {
  let c = useGlobal(CEGlobal, id);

  if (!component.edit.show || !component.edit.id) {
    return true;
  }

  return (
    <Modal
      onOpenChange={(open) => {
        if (!open) {
          component.edit.show = false;

          if (!c.editor.active && c.editor.lastActive.item) {
            c.editor.active = c.editor.lastActive.item;
            c.editor.lastActive.item = null;
          }

          reloadCE(c);
        }
      }}
    >
      <div
        className={cx(
          "fixed flex items-stretch flex-col inset-[50px] bg-white shadow-xl editor",
          editorStyle
        )}
      >
        <CompTab id={id} />

        {component.docs[component.edit.id] && (
          <ComponentEditor
            doc={component.docs[component.edit.id] as CompDoc}
            id={component.edit.id}
          />
        )}
      </div>
    </Modal>
  );
};

const ComponentEditor: FC<{
  doc: CompDoc;
  id: string;
}> = ({ doc, id }) => {
  const c = useGlobal(CEGlobal, `COMP_${id}`);
  const local = useLocal({ loading: false });
  c.editor.enabled = true;

  const componentOnLoad = useCallback(
    async (items: MItem[]) => {
      for (const item of items) {
        const compid = item.get("component")?.get("id");
        if (compid !== id) {
          instantiateComp(c, item);
        }
      }

      if (local.loading) {
        local.loading = false;
        setTimeout(() => local.render);
      }
    },
    [id, doc]
  );

  if (!c.doc || !c.map || !c.root) {
    c.doc = doc;
    const map = doc.getMap("map");
    const root = map.get("content_tree");
    if (map && root) {
      c.map = map;
      c.root = root;

      local.loading = true;
      loadComponents(c.map.get("content_tree")).then(componentOnLoad);
    }
  }

  if (!local.loading && c.map && c.root) {
    local.loading = componentShouldLoad(c, c.root, id);
    if (local.loading) {
      loadComponents(c.map.get("content_tree")).then(componentOnLoad);
    }
  }

  return (
    <div
      className={cx(
        "editor flex flex-1 flex-col items-stretch relative",
        editorStyle
      )}
    >
      <ContentEditor id={`COMP_${id}`} />
      {local.loading && (
        <div className="absolute inset-0 flex bg-white bg-opacity-80">
          <Loading backdrop={false} />
        </div>
      )}
    </div>
  );
};
