import { FC, useEffect } from "react";
import { useGlobal } from "web-utils";
import { CEGlobal } from "../../base/global/content-editor";
import { component } from "../page/component";
import { IContent, MPage } from "../types/general";
import { Loading } from "../ui/loading";
import { componentShouldLoad, loadComponents } from "./comp/load-comp";
import { ContentEditor } from "./content";
import { Toolbar } from "./content/toolbar/Toolbar";
import { wsdoc } from "./ws/wsdoc";

export const PageEditor: FC<{
  page?: MPage | null;
  global: { css: string | null; api_url?: string };
}> = ({ page, global }) => {
  const c = useGlobal(CEGlobal, `PAGE`);
  wsdoc.page = c;
  c.global.scss = global.css || "";
  c.global.api_url = global.api_url || "";
  c.editor.enabled = true;

  if (!c.doc || !c.map || !c.root) {
    c.doc = page as any;
    if (c.doc) {
      c.map = c.doc.getMap("map");
      if (c.map) {
        component.edit.loading = true;
        loadComponents(c.map.get("content_tree")?.toJSON() as IContent).then(
          (comps) => {
            for (const [k, v] of Object.entries(comps)) {
              component.docs[k] = v;
            }
            component.edit.loading = false;
            c.render();
          }
        );
        c.root = c.map.get("content_tree") as any;
      }
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
            component.docs[k] = v;
          }
          component.edit.loading = false;
          c.render();
        }
      );
    }
  }

  useEffect(() => {
    const keyDown = async (evt: KeyboardEvent) => {
      if (
        (evt.key === "Y" || evt.key === "y") &&
        (evt.ctrlKey || evt.metaKey) &&
        !evt.shiftKey
      ) {
        wsdoc.undoManager.redo();
        return;
      }

      if (
        (evt.key === "Z" || evt.key === "z") &&
        (evt.ctrlKey || evt.metaKey) &&
        evt.shiftKey
      ) {
        wsdoc.undoManager.redo();

        return;
      }

      if (
        (evt.key === "Z" || evt.key === "z") &&
        (evt.ctrlKey || evt.metaKey) &&
        !evt.shiftKey
      ) {
        wsdoc.undoManager.undo();
      }
      if (wsdoc.keyDown !== "ctrl")
        if (evt.ctrlKey || evt.metaKey) {
          wsdoc.keyDown = "ctrl";
          return;
        }
      if (wsdoc.keyDown !== "shift")
        if (evt.shiftKey || evt.metaKey) {
          wsdoc.keyDown = "shift";
          return;
        }
    };
    const keyUp = async (evt: KeyboardEvent) => {
      if (wsdoc.keyDown === "ctrl")
        if (!evt.ctrlKey) {
          wsdoc.keyDown = null;
        }
      if (wsdoc.keyDown === "shift")
        if (!evt.shiftKey) {
          wsdoc.keyDown = null;
        }
    };
    window.addEventListener("keydown", keyDown, true);
    window.addEventListener("keyup", keyUp, true);
    return () => {
      window.removeEventListener("keydown", keyDown, true);
      window.removeEventListener("keyup", keyUp, true);
    };
  }, []);

  return (
    <>
      <Toolbar disable={true} />
      {page && <ContentEditor id={`PAGE`} />}
      {(component.edit.loading || !page) && <Loading />}
    </>
  );
};
