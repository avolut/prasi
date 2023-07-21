import { FC } from "react";
import { useGlobal } from "web-utils";
import { CEGlobal, CompDoc } from "../../../base/global/content-editor";
import { Modal } from "../../ui/modal";
import { ContentEditor } from "../content";
import { editorStyle } from "../style";
import { component } from "../../page/component";
import { CompTab } from "./comp-tab";
import { Loading } from "../../ui/loading";
import { IContent } from "../../types/general";
import { componentShouldLoad, loadComponents } from "./load-comp";

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

          c.render();
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
  c.editor.enabled = true;
  if (!c.doc || !c.map || !c.root) {
    c.doc = doc;
    const map = doc.getMap("map");
    const root = map.get("content_tree");
    if (map && root) {
      c.map = map;
      c.root = root;

      component.edit.loading = true;
      loadComponents(c.map.get("content_tree")?.toJSON() as IContent).then(
        (comps) => {
          for (const [k, v] of Object.entries(comps)) {
            if (!component.docs[k]) component.docs[k] = v;
          }
          component.edit.loading = false;
          c.render();
        }
      );
    }
  }

  if (!component.edit.loading && c.map && c.root) {
    const root = c.root.toJSON() as IContent;
    component.edit.loading = componentShouldLoad(root);
    if (component.edit.loading) {
      component.edit.loading = true;
      loadComponents(c.map.get("content_tree")?.toJSON() as IContent).then(
        (comps) => {
          for (const [k, v] of Object.entries(comps)) {
            if (!component.docs[k]) component.docs[k] = v;
          }
          component.edit.loading = false;
          c.render();
        }
      );
    }
  }

  return (
    <div
      className={cx("editor flex flex-1 flex-col items-stretch", editorStyle)}
    >
      <ContentEditor id={`COMP_${id}`} />
      {component.edit.loading && (
        <div className="fixed inset-0">
          <Loading backdrop={false} />
        </div>
      )}
    </div>
  );
};
