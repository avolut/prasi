import { useGlobal } from "web-utils";
import { EPage } from "../elements/e-page";
import { editorStyle } from "../elements/style";
import { EditorGlobal } from "../logic/global";
import { PageManager } from "./manager/page/PageManager";
import { SiteManager } from "./manager/site/SiteManager";
import { EScriptElement } from "./script/script-element";
import { ESide } from "./side/Side";
import { Toolbar } from "./toolbar/Toolbar";
import { ETree } from "./tree/tree";

export const EMainEditor = () => {
  const p = useGlobal(EditorGlobal, "EDITOR");

  return (
    <div
      className={cx("editor flex-1 flex flex-col items-stretch", editorStyle)}
    >
      <Toolbar />
      <div className={cx("editor-box flex flex-row flex-1")}>
        <ETree />
        <EPage />
        <ESide />
      </div>
      {p.manager.site && <SiteManager />}
      {p.manager.page && <PageManager />}
      {p.script.active && <EScriptElement />}
    </div>
  );
};
