import { createId } from "@paralleldrive/cuid2";
import { FC } from "react";
import { useGlobal } from "web-utils";
import { syncronize } from "y-pojo";
import * as Y from "yjs";
import { CEGlobal } from "../../../../../base/global/content-editor";
import { fillID } from "../../../../page/tools/fill-id";
import { MContent } from "../../../../types/general";
import { IItem } from "../../../../types/item";
import { ISection } from "../../../../types/section";
import { IText } from "../../../../types/text";
import { ToolbarBox } from "../../../../ui/box";

export const AddElement: FC<{ id: string; disableSection?: boolean }> = ({
  id,
  disableSection,
}) => {
  const c = useGlobal(CEGlobal, id);
  let canAdd = true;
  if (!c.editor.active) {
    canAdd = false;
  }

  const ed = c.editor;
  const type = ed.active?.get("type");
  if (ed.active && ed.active.get("component")?.get("id")) {
    canAdd = false;
  }
  if (disableSection && type !== "text") canAdd = true;

  return (
    <>
      <ToolbarBox
        label="ADD"
        // label={
        //   <>
        //     <IconPlus />
        //   </>
        // }
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
              } as IText;
              if (ed.active) {
                if (type === "item") {
                  const map = new Y.Map() as MContent;
                  if (map) {
                    syncronize(map as any, fillID(json));
                    const childs = ed.active.get("childs");
                    if (childs) {
                      childs.push([map]);
                    }
                    ed.active = map;
                  }
                } else if (type === "text") {
                  ed.active.parent.forEach((e, idx) => {
                    if (e === c) {
                      const map = new Y.Map() as MContent;
                      if (map && ed.active) {
                        syncronize(map as any, fillID(json));
                        ed.active.parent.insert(idx + 1, [map]);
                        ed.active = map;
                      }
                    }
                  });
                }
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
              } as IItem;
              if (ed.active) {
                if (type !== "text") {
                  const map = new Y.Map() as MContent;
                  if (map) {
                    syncronize(map as any, fillID(json));
                    const childs = ed.active.get("childs");
                    if (childs) {
                      childs.push([map]);
                    }
                    ed.active = map;
                  }
                } else {
                  ed.active.parent.forEach((e, idx) => {
                    if (e === c) {
                      const map = new Y.Map() as MContent;
                      if (map && ed.active) {
                        syncronize(map as any, fillID(json));
                        ed.active.parent.insert(idx + 1, [map]);
                        ed.active = map;
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
                  } as ISection;

                  if (ed.active) {
                    let _c = ed.active as MContent;
                    while (_c.get("type") !== "section") {
                      _c = _c.parent.parent as any;
                    }

                    if (_c.get("type") === "section") {
                      _c.parent.forEach((e: MContent, idx) => {
                        if (e === _c) {
                          const map = new Y.Map() as MContent;
                          if (map) {
                            syncronize(map as any, fillID(json));
                            _c.parent.insert(idx + 1, [map]);
                            ed.active = map;
                          }
                        }
                      });
                    }
                  } else {
                    const ctree = c.map.get("content_tree");
                    const childs = ctree?.get("childs");
                    if (childs) {
                      const map = new Y.Map() as MContent;
                      if (map) {
                        syncronize(map as any, fillID(json));
                        childs.push([map]);
                        ed.active = map;
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
