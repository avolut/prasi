import { FC } from "react";
import { useGlobal } from "web-utils";
import { CEGlobal } from "../../../base/global/content-editor";
import { component } from "../../page/component";
import { ResponsiveToggle } from "../content/toolbar/right/ResponsiveToggle";
import { AddElement } from "../content/toolbar/middle/AddElement";

export const CompTab: FC<{ id: string }> = ({ id }) => {
  const c = useGlobal(CEGlobal, id);

  const tabs = component.edit.tabs;
  if (tabs) {
    return (
      <div className="min-h-[30px] border-b flex justify-between items-stretch select-none">
        <div className="flex items-stretch">
          {[...tabs].map((compid, idx) => {
            const doc = component.docs[compid];
            const closeBtn = (
              <div
                className={cx(
                  "h-[18px] w-[18px] absolute right-[5px] rounded-xs border text-lg flex items-center justify-center  close border-transparent hover:border-slate-400 bg-white hover:bg-white cursor-pointer"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  if (tabs.size === 1) {
                    tabs.clear();
                    component.edit.show = false;
                  } else {
                    if (component.edit.id === compid) {
                      component.edit.switching = true;
                      component.edit.id = [...tabs][idx === 0 ? 1 : idx - 1];

                      setTimeout(() => {
                        component.edit.switching = false;
                        c.editor.active = null;
                        c.render();
                      }, 10);
                    }
                    tabs.delete(compid);
                  }
                  c.render();
                }}
              >
                &times;
              </div>
            );
            if (!doc) {
              return (
                <div
                  key={idx}
                  className="text-xs p-1 flex items-center space-x-2 border-r"
                >
                  <div>
                    <div>Component Not Found:</div>
                    <code className="text-[9px]">{compid}</code>
                  </div>
                  {closeBtn}
                </div>
              );
            }

            const comp = doc.getMap("map");
            return (
              <div
                key={compid}
                className={cx(
                  "pl-3 pr-[4px] relative whitespace-nowrap w-[100px] flex items-center border-r text-sm hover:bg-blue-100 cursor-pointer space-x-1 overflow-hidden",
                  comp.get("id") === component.edit.id &&
                    "border-b-2 border-b-blue-500 bg-blue-50",
                  css`
                    .close {
                      opacity: 0;
                    }

                    &:hover {
                      .close {
                        opacity: 1;
                      }
                    }
                  `
                )}
                onClick={() => {
                  const _c = c;
                  component.edit.id = compid;
                  component.edit.switching = true;
                  _c.render();
                  setTimeout(() => {
                    component.edit.switching = false;
                    _c.editor.active = null;
                    _c.render();
                  }, 10);
                }}
              >
                <div className="absolute overflow-hidden">
                  &lt;{comp.get("name")}/&gt;
                </div>
                {closeBtn}
              </div>
            );
          })}
        </div>
        <div
          className={cx(
            "toolbar flex mr-1",
            css`
              align-items: center !important;
              border-bottom: 0px !important;
              height: auto !important;

              .toolbar-box {
                height: 22px;
                margin: 0px !important;
              }
            `
          )}
        >
          <AddElement disableSection id={`COMP_${component.edit.id}`} />
          <div className="w-[5px] h-1"></div>
          <ResponsiveToggle />
        </div>
      </div>
    );
  }
  return null;
};
