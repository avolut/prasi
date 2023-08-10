import { createId } from "@paralleldrive/cuid2";
import { FC } from "react";
import { useGlobal } from "web-utils";
import { syncronize } from "y-pojo";
import * as Y from "yjs";
import { EditorGlobal } from "../../../logic/global";
import { ToolbarBox } from "../../../../../utils/ui/box";
import { IText } from "../../../../../utils/types/text";
import { ISection } from "../../../../../utils/types/section";
import { MContent } from "../../../../../utils/types/general";
import { fillID } from "../../../tools/fill-id";
import { newMap } from "../../../tools/yjs-tools";
import { IItem } from "../../../../../utils/types/item";

export const AddElement: FC<{ disableSection?: boolean }> = ({
  disableSection,
}) => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  //   console.log(p);
  let canAdd = true;
  if (!p.item.active) {
    canAdd = false;
  }

  const item = p.item.active ? p.treeMeta[p.item.active] : null;

  const mitem = item ? item.item : null;
  const type = mitem?.get("type");
  if (p.item.active && mitem?.get("component")?.get("id")) {
    canAdd = false;
  }
  if (disableSection && type !== "text") canAdd = true;

  return (
    <>
      <ToolbarBox
        // label="ADD"
        label={
          <>
            <IconPlus />
          </>
        }
        items={[
          {
            onClick() {
              const json = {
                id: createId(),
                name: `New Text`,
                type: "text",
                dim: { w: "full", h: "fit" },
                layout: { align: "center", dir: "col", gap: 0 },
                text: "",
                html: "",
                adv: {
                  css: "",
                },
              } as IText;
              if (p.item.active && mitem) {
                if (type === "item") {
                  const map = new Y.Map() as MContent;
                  if (map) {
                    syncronize(map as any, fillID(json));
                    const childs = mitem.get("childs");
                    if (childs) {
                      childs.push([map]);
                    }
                    const item = map.toJSON();
                    p.item.active = item.id;
                  }
                } else if (type === "text") {
                  let done = false;
                  mitem.parent.forEach((e, idx) => {
                    if (done) return;
                    if (e.get("id") === p.item.active) {
                      const map = new Y.Map() as MContent;
                      if (map && p.item.active) {
                        syncronize(map as any, fillID(json));
                        mitem.parent.insert(idx + 1, [map]);
                        let active = mitem.parent.get(idx + 1) as any;
                        const item = active.toJSON();
                        p.item.active = item.id;
                        done = true;
                      }
                    }
                  });
                }
                //   setTimeout(() => {
                //     if (ed.active?.get("type") === "text") {
                //       c.editor.activeEl?.focus();
                //     }
                //   }, 100);
              }
            },
            disabled: !canAdd || type === "section",
            tooltip: "Add Text",
            content: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="none"
                viewBox="0 0 15 15"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M3.95 2.95V4.5a.45.45 0 01-.9 0v-2a.45.45 0 01.45-.45h8a.45.45 0 01.45.45v2a.45.45 0 11-.9 0V2.95h-3v9.1h1.204a.45.45 0 010 .9h-3.5a.45.45 0 110-.9H6.95v-9.1h-3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            ),
          },
          {
            tooltip: "Add Item",
            disabled: !canAdd,
            onClick() {
              const json = {
                id: createId(),
                name: `New Item`,
                type: "item",
                dim: { w: "fit", h: "fit" },
                childs: [],
                adv: {
                  css: "",
                },
              } as IItem;
              if (p.item.active && mitem) {
                if (type !== "text") {
                  const map = new Y.Map() as MContent;
                  if (map) {
                    syncronize(map as any, fillID(json));
                    const childs = mitem.get("childs");
                    if (childs) {
                      childs.push([map]);
                    }
                    const item = map.toJSON();
                    p.item.active = item.id;
                  }
                } else {
                  let done = false;
                  mitem.parent.forEach((e, idx) => {
                    if (done) return;
                    if (e.get("id") === p.item.active) {
                      const map = new Y.Map() as MContent;
                      if (map && p.item.active) {
                        syncronize(map as any, fillID(json));
                        mitem.parent.insert(idx + 1, [map]);
                        let active = mitem.parent.get(idx + 1) as any;
                        const item = active.toJSON();
                        p.item.active = item.id;
                        done = true;
                      }
                    }
                  });
                }
              }
            },
            content: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="none"
                viewBox="0 0 15 15"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M1.5 2a.5.5 0 100-1 .5.5 0 000 1zm3 0a.5.5 0 100-1 .5.5 0 000 1zM8 1.5a.5.5 0 11-1 0 .5.5 0 011 0zm2.5.5a.5.5 0 100-1 .5.5 0 000 1zm3.5-.5a.5.5 0 11-1 0 .5.5 0 011 0zM1.5 14a.5.5 0 100-1 .5.5 0 000 1zm.5-3.5a.5.5 0 11-1 0 .5.5 0 011 0zM1.5 8a.5.5 0 100-1 .5.5 0 000 1zM2 4.5a.5.5 0 11-1 0 .5.5 0 011 0zM13.5 11a.5.5 0 100-1 .5.5 0 000 1zm.5-3.5a.5.5 0 11-1 0 .5.5 0 011 0zM13.5 5a.5.5 0 100-1 .5.5 0 000 1zM5 13.5a.5.5 0 11-1 0 .5.5 0 011 0zm2.5.5a.5.5 0 100-1 .5.5 0 000 1zm3.5-.5a.5.5 0 11-1 0 .5.5 0 011 0zm2.5.5a.5.5 0 100-1 .5.5 0 000 1zM4 5a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm1 0h5v5H5V5z"
                  clipRule="evenodd"
                ></path>
              </svg>
            ),
          },
          disableSection
            ? undefined
            : {
                tooltip: "Add Section",
                onClick: () => {
                  const json = {
                    id: createId(),
                    name: `New Section`,
                    type: "section",
                    dim: { w: "full", h: "full" },
                    childs: [],
                    adv: {
                      css: "",
                    },
                  } as ISection;
                  const comp = p.comps.doc[p.comp?.id || ""];
                  let root: any = comp
                    ? comp.getMap("map")
                    : p.mpage?.getMap("map");
                  if (root) {
                    const ctree = root.get("content_tree");
                    const childs = ctree.get("childs");
                    if (childs) {
                      const map = new Y.Map() as MContent;
                      if (map) {
                        syncronize(map as any, fillID(json));
                        childs.push([map]);
                        const mitem = map.toJSON();
                        p.item.active = mitem.id;
                      }
                    }
                  }
                },
                content: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    fill="none"
                    viewBox="0 0 15 15"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M2 1.5a.5.5 0 11-1 0 .5.5 0 011 0zM2 5v5h11V5H2zm0-1a1 1 0 00-1 1v5a1 1 0 001 1h11a1 1 0 001-1V5a1 1 0 00-1-1H2zm-.5 10a.5.5 0 100-1 .5.5 0 000 1zM4 1.5a.5.5 0 11-1 0 .5.5 0 011 0zM3.5 14a.5.5 0 100-1 .5.5 0 000 1zM6 1.5a.5.5 0 11-1 0 .5.5 0 011 0zM5.5 14a.5.5 0 100-1 .5.5 0 000 1zM8 1.5a.5.5 0 11-1 0 .5.5 0 011 0zM7.5 14a.5.5 0 100-1 .5.5 0 000 1zM10 1.5a.5.5 0 11-1 0 .5.5 0 011 0zM9.5 14a.5.5 0 100-1 .5.5 0 000 1zM12 1.5a.5.5 0 11-1 0 .5.5 0 011 0zM11.5 14a.5.5 0 100-1 .5.5 0 000 1zM14 1.5a.5.5 0 11-1 0 .5.5 0 011 0zM13.5 14a.5.5 0 100-1 .5.5 0 000 1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                ),
              },
        ]}
      />
    </>
  );
};

const IconPlus = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    fill="none"
    viewBox="0 0 15 15"
    className="mb-[2px]"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 2.75a.5.5 0 00-1 0V7H2.75a.5.5 0 000 1H7v4.25a.5.5 0 001 0V8h4.25a.5.5 0 000-1H8V2.75z"
      clipRule="evenodd"
    ></path>
  </svg>
);
