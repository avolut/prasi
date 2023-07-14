import { FC, useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { CEGlobal } from "../../../base/global/content-editor";
import { MText } from "../../types/text";
import { CERender } from "./ce-render";
import { wsdoc } from "../../editor/ws/wsdoc";

export const CEText: FC<{ ceid: string; item: MText; scopeName?: string }> = ({
  ceid,
  item,
  scopeName,
}) => {
  const c = useGlobal(CEGlobal, ceid);

  return (
    <>
      <CERender ceid={ceid} item={item} scopeName={scopeName}>
        {c.editor.enabled ? (
          <CETextEditable ceid={ceid} item={item} />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: item.get("html") || "",
            }}
            className={cx("outline-none select-text whitespace-nowrap")}
          />
        )}
      </CERender>
    </>
  );
};

const CETextEditable: FC<{ ceid: string; item: MText }> = ({ ceid, item }) => {
  const c = useGlobal(CEGlobal, ceid);
  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: item.get("html") || "",
        }}
        contentEditable
        onBlur={() => {
          c.editor.focusedTextID = "";
          c.render();
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
          if (c.editor.active !== item) {
            c.editor.hover = null;
            c.editor.focusedTextID = item.get("id") || "";
            c.editor.active = item;
            c.editor.multiple.active = [];
            c.render();
            setTimeout(() => {
              c.editor.activeEl?.focus();
            }, 100);
          }
        }}
        onInput={(e) => {
          wsdoc.lastTypedTimeestamp = Date.now();
          item.set("html", e.currentTarget.innerHTML);
        }}
        spellCheck={false}
        className={cx(
          item.get("id"),
          "outline-none select-text whitespace-nowrap",
          css`
            min-width: 25px;
          `
        )}
      />
    </>
  );
};
