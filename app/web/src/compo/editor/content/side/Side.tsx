import { FC, useCallback } from "react";
import { useGlobal, useLocal } from "web-utils";
import { syncronize } from "y-pojo";
import * as Y from "yjs";
import { TypedMap } from "yjs-types";
import { CEGlobal } from "../../../../base/global/content-editor";
import { component } from "../../../page/component";
import { IItem, MItem } from "../../../types/item";
import { wsdoc } from "../../ws/wsdoc";
import { CompProps } from "./CompProps";
import { PanelAdv } from "./panel/advanced";
import { PanelAutoLayout } from "./panel/auto-layout";
import { PanelBackground } from "./panel/background";
import { PanelDimension } from "./panel/dimension";
import { PanelFont } from "./panel/font";
import { PanelLink } from "./panel/link";
import { PanelPadding } from "./panel/padding";
import { SideBox } from "./ui/SideBox";
import { SideLabel } from "./ui/SideLabel";
import { PanelBorder } from "./panel/border";

export const CESide: FC<{ id: string }> = ({ id }) => {
  const c = useGlobal(CEGlobal, id);
  const local = useLocal({ rootEditingProps: false, lastActive: null as any });
  const update = useCallback(
    (key: string, value: any) => {
      let act = c.editor.active as TypedMap<any>;
      if (act) {
        if (wsdoc.mode === "mobile") {
          let mobile = act.get("mobile");
          if (!mobile) {
            act.set("mobile", new Y.Map() as any);
            mobile = act.get("mobile");
          }
          act = mobile as any;
        }

        let prop = act?.get(key);

        if (!prop) {
          let nprop = null;
          if (typeof value === "object") {
            if (Array.isArray(value)) {
              nprop = new Y.Array();
            } else {
              nprop = new Y.Map();
            }
          }
          act.set(key, nprop);
          prop = act.get(key);
        }

        if (prop) {
          syncronize(prop, value);
          c.render();
        }
      }
    },
    [id]
  );

  const active = c.editor.active?.toJSON() as IItem;
  const rootComponentID = (c.root as MItem)?.get("component")?.get("id");

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

  if (
    component.edit.activatePropEditing &&
    component.edit.id === rootComponentID
  ) {
    local.lastActive = c.editor.active;
    component.edit.activatePropEditing = false;
    local.rootEditingProps = true;
    c.editor.active = c.root as MItem;
  }

  if (compItem && !compItem.props) {
    const comp = c.editor.active?.get("component");
    if (comp) {
      comp.set("props", new Y.Map() as any);
    }
  }

  if (local.rootEditingProps) {
    const comp = component.docs[component.edit.id]
      ?.getMap("map")
      .get("content_tree")
      ?.get("component");
    const props = comp?.get("props");
    if (!props) {
      comp?.set("props", new Y.Map() as any);
    }
  }

  return (
    <div className={cx("side", "flex select-none relative overflow-auto")}>
      <div className="absolute inset-0 flex flex-col items-stretch justify-start text-[13px]">
        {active && (
          <>
            {compItem?.id ? (
              <>
                <CompProps
                  id={id}
                  props={c.editor.active?.get("component")?.get("props")}
                  mode="instance"
                />
              </>
            ) : (
              <>
                {local.rootEditingProps ? (
                  <>
                    <CompProps
                      id={id}
                      mode="root"
                      props={component.docs[component.edit.id]
                        ?.getMap("map")
                        .get("content_tree")
                        ?.get("component")
                        ?.get("props")}
                      back={() => {
                        c.editor.active = local.lastActive;
                        local.rootEditingProps = false;
                        local.render();
                      }}
                    />
                  </>
                ) : (
                  <>
                    <SideLabel sep="bottom">
                      <div className="flex items-center justify-between">
                        <div>LAYOUT</div>
                        {rootComponentID && (
                          <div
                            className="flex mr-1 px-2 text-xs border rounded-sm cursor-pointer hover:bg-blue-50 hover:border-blue-500 text-blue-700"
                            onClick={() => {
                              component.edit.activatePropEditing = true;
                              local.render();
                            }}
                          >
                            Edit Master Props
                          </div>
                        )}
                      </div>
                    </SideLabel>
                    <SideBox>
                      <PanelAutoLayout
                        value={active}
                        mode={wsdoc.mode}
                        update={update}
                      />
                      <PanelPadding
                        value={active}
                        mode={wsdoc.mode}
                        update={update}
                      />
                      <PanelDimension
                        value={active}
                        mode={wsdoc.mode}
                        id={id}
                        update={update}
                      />
                    </SideBox>
                    <SideLabel>BACKGROUND</SideLabel>
                    <SideBox>
                      <PanelBackground
                        value={active}
                        mode={wsdoc.mode}
                        update={update}
                      />
                    </SideBox>
                    <SideLabel>FONT</SideLabel>
                    <SideBox>
                      <PanelFont
                        value={active}
                        mode={wsdoc.mode}
                        update={update}
                      />
                    </SideBox>
                    <SideLabel>BORDER</SideLabel>
                    <SideBox>
                      <PanelBorder
                        value={active}
                        mode={wsdoc.mode}
                        update={update}
                      />
                    </SideBox>
                    <SideLabel>ADVANCED</SideLabel>
                    <SideBox>
                      <PanelLink
                        value={active}
                        mode={wsdoc.mode}
                        update={update}
                      />
                      <PanelAdv
                        id={id}
                        value={active}
                        mode={wsdoc.mode}
                        update={update}
                      />
                    </SideBox>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
