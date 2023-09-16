import { useCallback } from "react";
import { useGlobal, useLocal } from "web-utils";
import { syncronize } from "y-pojo";
import * as Y from "yjs";
import { TypedMap } from "yjs-types";
import { IItem, MItem } from "../../../../utils/types/item";
import { EditorGlobal } from "../../logic/global";
import { PanelAdv } from "./panel/advanced";
import { PanelAutoLayout } from "./panel/auto-layout";
import { PanelBackground } from "./panel/background";
import { PanelBorder } from "./panel/border";
import { PanelDimension } from "./panel/dimension";
import { PanelFont } from "./panel/font";
import { PanelLink } from "./panel/link";
import { PanelPadding } from "./panel/padding";
import { CPInstance } from "./props/CPInstance";
import { CPMaster, PreviewItemProp } from "./props/CPMaster";
import { SideBox } from "./ui/SideBox";
import { SideLabel } from "./ui/SideLabel";

export const ESide = () => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const local = useLocal({ rootEditingProps: false, lastActive: null as any });
  p.softRender.side = local.render;

  const update = useCallback(
    (key: string, value: any) => {
      if (p.item.active) {
        const meta = p.treeMeta[p.item.active];
        let mitem = meta.mitem as TypedMap<any>;

        if (p.comp?.item.id === p.item.active) {
          mitem = p.comps.doc[p.comp?.id]
            .getMap("map")
            .get("content_tree") as MItem;
        }

        if (p.mode === "mobile") {
          let mobile = mitem.get("mobile");
          if (!mobile) {
            mitem.set("mobile", new Y.Map() as any);
            mobile = mitem.get("mobile");
          }
          mitem = mobile as any;
        }
        let prop = mitem?.get(key);

        if (!prop) {
          let nprop = null;
          if (typeof value === "object") {
            if (Array.isArray(value)) {
              nprop = new Y.Array();
            } else {
              nprop = new Y.Map();
            }
          }
          if (mitem) {
            mitem.set(key, nprop);
            prop = mitem.get(key);
          }
        }

        if (prop) {
          syncronize(prop, value);
          p.render();
        }
      }
    },
    [p.item.active]
  );
  const item = p.item.active ? p.treeMeta[p.item.active] : null;
  const mitem = item ? item.mitem : null;
  const active: any = mitem ? mitem.toJSON() : null;

  const rootComponentID = p.comp?.id;
  let compItem = (active as IItem)?.component;
  let isComponentRoot = false;
  if (rootComponentID && rootComponentID === compItem?.id) {
    compItem = undefined;
    isComponentRoot = true;
  }
  if (!isComponentRoot) {
    local.rootEditingProps = false;
    local.lastActive = null;
  }
  if (compItem && !compItem.props) {
    const comp = mitem?.get("component");
    if (comp) {
      comp.set("props", new Y.Map() as any);
    }
  }

  return (
    <div
      className={cx(
        "side flex select-none relative overflow-x-hidden overflow-y-auto"
      )}
      onPointerEnter={() => {
        p.item.sideHover = true;
        p.render();
      }}
      onPointerLeave={() => {
        p.item.sideHover = false;
        p.render();
      }}
    >
      <div className="absolute inset-0 flex flex-col items-stretch justify-start text-[13px]">
        {mitem ? (
          <>
            {compItem?.id ? (
              <>
                <CPInstance mitem={mitem as MItem} />
              </>
            ) : (
              <>
                {rootComponentID && p.compProp.edit ? (
                  <>
                    <CPMaster mitem={mitem as MItem} />
                  </>
                ) : (
                  <>
                    <SideLabel sep="bottom">
                      <div className="flex items-center justify-between">
                        {!rootComponentID ? (
                          <div>LAYOUT</div>
                        ) : (
                          <>
                            <div
                              className="flex mr-1 px-2 bg-white text-xs border rounded-sm cursor-pointer hover:bg-blue-50 hover:border-blue-500 text-blue-700"
                              onClick={() => {
                                p.compProp.edit = true;
                                p.render();
                              }}
                            >
                              Master Props
                            </div>
                            <PreviewItemProp />
                          </>
                        )}
                      </div>
                    </SideLabel>
                    <SideBox>
                      <PanelAutoLayout
                        value={active}
                        mode={p.mode}
                        update={update}
                      />
                      <PanelPadding
                        id={p.item.active}
                        value={active}
                        mode={p.mode}
                        update={update}
                      />
                      <PanelDimension
                        value={active}
                        mode={p.mode}
                        id={p.item.active}
                        update={update}
                      />
                    </SideBox>
                    <SideLabel>BACKGROUND</SideLabel>
                    <SideBox>
                      <PanelBackground
                        value={active}
                        mode={p.mode}
                        update={update}
                      />
                    </SideBox>
                    <SideLabel>FONT</SideLabel>
                    <SideBox>
                      <PanelFont value={active} mode={p.mode} update={update} />
                    </SideBox>
                    <SideLabel>BORDER</SideLabel>
                    <SideBox>
                      <PanelBorder
                        value={active}
                        mode={p.mode}
                        update={update}
                      />
                    </SideBox>
                    <SideLabel>ADVANCED</SideLabel>
                    <SideBox>
                      <PanelLink value={active} mode={p.mode} update={update} />
                      <PanelAdv value={active} mode={p.mode} update={update} />
                    </SideBox>
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
