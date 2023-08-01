import { FC, useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { CEGlobal } from "../../base/global/content-editor";
import { MPage } from "../types/general";
import { MItem } from "../types/item";
import { Loading } from "../ui/loading";
import {
  componentShouldLoad,
  instantiateComp,
  loadComponents,
} from "./comp/load-comp";
import { ContentEditor } from "./content";
import { Toolbar } from "./content/toolbar/Toolbar";
import { wsdoc } from "./ws/wsdoc";
import { component } from "../page/component";

export const PageEditor: FC<{
  page?: MPage | null;
  global: { css: string | null; api_url?: string };
}> = ({ page, global }) => {
  const c = useGlobal(CEGlobal, `PAGE`);
  const local = useLocal({ loading: false });
  wsdoc.page = c;
  c.global.scss = global.css || "";
  c.global.api_url = global.api_url || "";
  c.editor.enabled = true;

  const componentOnLoad = async (items: MItem[]) => {
    for (const item of items) {
      instantiateComp(c, item);
    }

    local.loading = false;
    c.render();
  };

  if (!c.doc || !c.map || !c.root) {
    c.doc = page as any;
    if (c.doc) {
      c.map = c.doc.getMap("map");
      if (c.map) {
        local.loading = true;
        loadComponents(c.map.get("content_tree")).then(componentOnLoad);
        c.root = c.map.get("content_tree") as any;
      }
    }
  } else {
    if (
      !local.loading &&
      !component.edit.id &&
      componentShouldLoad(c, c.root)
    ) {
      local.loading = true;
      loadComponents(c.map.get("content_tree")).then(componentOnLoad);
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
      <Toolbar />
      {page && <ContentEditor id={`PAGE`} />}
      {(local.loading || !page) && <Loading />}
    </>
  );
};
