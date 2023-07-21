import { NodeModel, useDragOver } from "@minoru/react-dnd-treeview";
import { FC } from "react";
import { useGlobal, useLocal } from "web-utils";
import { CEGlobal } from "../../../../base/global/content-editor";
import { component } from "../../../page/component";
import { fillID } from "../../../page/tools/fill-id";
import { NodeContent } from "../../../page/tools/flatten-tree";
import { IContent, MContent } from "../../../types/general";
import { MItem } from "../../../types/item";
import {
  FMAdv,
  FMComponent,
  FNCompDef,
  FNComponent,
} from "../../../types/meta-fn";
import { Tooltip } from "../../../ui/tooltip";
import { getArray, getMText, getMap, newMap } from "../../tools/yjs-tools";
import { wsdoc } from "../../ws/wsdoc";
import { CETreeMenu } from "./tree-menu";

export const DEPTH_WIDTH = 8;
export const CETreeItem: FC<{
  id: string;
  node: NodeModel<NodeContent>;
  depth: number;
  isOpen: boolean;
  onToggle: () => void;
  select: (item: MContent) => void;
}> = ({ id, node, depth, isOpen, onToggle, select }) => {
  const c = useGlobal(CEGlobal, id);

  const local = useLocal({
    renaming: false,
    newname: "",
    hover: false,
    contextMenu: null as null | React.MouseEvent<HTMLDivElement, MouseEvent>,
  });
  const dragOverProps = useDragOver(node.id, isOpen, onToggle);
  const data = node.data;
  if (!data) {
    return null;
  }

  const item = data.content;
  const isActive = c.editor.active?.get("id") === item.get("id");
  const isHover = local.hover;
  const multipleActive = c.editor.multiple.active || [];
  const parentActive = multipleActive.find(
    (e) => e.get("id") === item.get("id")
  );
  const isParentActive =
    c.editor.copy === "multiple" && parentActive ? true : false;
  const type = item.get("type");
  let childs = getArray<MContent>(item, "childs");
  const adv = getMap<FMAdv>(item, "adv")?.toJSON() || {};
  let itemComponent: Partial<FNComponent> =
    getMap<FMComponent>(item, "component")?.toJSON() || {};
  const rootComponentID = (c.root as MItem).get("component")?.get("id");

  let link: string;
  if (wsdoc.mode === "mobile") {
    const mobile = item.get("mobile");
    link = mobile?.get("linktag")?.get("link") || "";
  } else {
    link = item.get("linktag")?.get("link") || "";
  }

  let isComponent = false;
  let canDelete = true;

  if (itemComponent && itemComponent.id) {
    if (type !== "item") {
      itemComponent = {};
    } else {
      isComponent = rootComponentID === itemComponent.id ? false : true;
    }

    if (rootComponentID && rootComponentID === itemComponent.id) {
      canDelete = false;
    }
  }

  let hasChilds = false;
  if (childs && childs.length > 0) {
    hasChilds = true;
  }
  let itemName = item.get("name");
  if (isComponent) {
    hasChilds = false;
    const props = component.docs[itemComponent.id || ""]
      ?.getMap("map")
      .get("content_tree")
      ?.get("component")
      ?.get("props")
      ?.toJSON() as Record<string, FNCompDef>;
    for (const [k, v] of Object.entries(itemComponent.props || {})) {
      let prop = null as null | FNCompDef;
      let type = v.meta?.type;
      if (props && props[k]) {
        prop = props[k];
        type = prop.meta?.type;
      }
      if (type === "content-element") {
        hasChilds = true;
        break;
      }
    }
    if (itemComponent.name) itemName = itemComponent.name;
  }

  let isPropContent = false;
  if (item.get("isPropContent")) {
    canDelete = false;
    isPropContent = true;
  }

  return (
    <div
      onClick={() => {
        if (item) select(item);
      }}
      onContextMenu={(e) => {
        local.contextMenu = e;
        local.render();
      }}
      onMouseEnter={() => {
        c.editor.hover = item;
        local.hover = true;
        c.render();
      }}
      onMouseLeave={() => {
        c.editor.hover = null;
        local.hover = false;
        c.render();
      }}
      className={cx(
        "item flex items-stretch cursor-pointer border-b relative ",
        isParentActive && !isActive && !isHover && "bg-blue-100",
        isComponent && !isActive && !isHover && "bg-purple-50",
        isActive && (isComponent ? "bg-purple-100" : "bg-blue-100"),
        isHover && (isComponent ? "bg-purple-100" : "hover:bg-blue-50"),
        css`
          min-height: 28px;
          > div {
            display: flex;
            align-items: center;
          }

          .action {
            opacity: 0.2;
          }

          &:hover .action {
            opacity: 1;
          }
        `
      )}
      {...dragOverProps}
    >
      {local.contextMenu && (
        <CETreeMenu
          id={id}
          item={item}
          onClose={() => {
            local.hover = false;
            local.contextMenu = null;
            local.render();
          }}
          contextMenu={local.contextMenu}
        />
      )}

      {isActive && !isComponent && (
        <div className="bg-blue-500 absolute left-0 top-0 bottom-0 w-[3px]"></div>
      )}

      {isComponent && (
        <div
          className={cx(
            isActive ? "bg-purple-700" : "bg-purple-400",
            "bg-opacity-40 flex items-center justify-center text-white absolute left-0 top-0 bottom-0",
            depth > 1 ? "w-[16px]" : "w-[7px]"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={depth > 1 ? "10" : "0"}
            height={depth > 1 ? "10" : "0"}
            fill="none"
            viewBox="0 0 15 15"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M7.289.797a.5.5 0 01.422 0l6 2.8A.5.5 0 0114 4.05v6.9a.5.5 0 01-.289.453l-6 2.8a.5.5 0 01-.422 0l-6-2.8A.5.5 0 011 10.95v-6.9a.5.5 0 01.289-.453l6-2.8zM2 4.806L7 6.93v6.034l-5-2.333V4.806zm6 8.159l5-2.333V4.806L8 6.93v6.034zm-.5-6.908l4.772-2.028L7.5 1.802 2.728 4.029 7.5 6.057z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      )}

      <div
        className={cx(
          css`
            padding-left: ${depth * DEPTH_WIDTH}px;
          `
        )}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      ></div>

      <div
        className={cx(
          "icon flex justify-center",
          css`
            width: 25px;
          `
        )}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        <div className="regular-icon">
          {type === "item" &&
            (hasChilds ? (
              <>{isOpen ? <ChevronDown /> : <ChevronRight />}</>
            ) : (
              <ItemIcon />
            ))}
          {type === "section" && (
            <>{isOpen ? <SectionDown /> : <SectionRight />}</>
          )}
          {type === "text" && <Text />}
        </div>
      </div>

      {local.renaming ? (
        <input
          type="text"
          title="Rename"
          value={local.newname}
          className="border px-1 text-sm flex-1 rounded-none outline-none border-2 border-blue-500"
          spellCheck={false}
          onChange={(e) => {
            local.newname = e.currentTarget.value;
            local.render();
          }}
          onFocus={(e) => {
            e.currentTarget.select();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.blur();
            }
          }}
          onBlur={() => {
            local.renaming = false;

            if (isComponent) {
              const comp = item.get("component");
              if (comp) comp.set("name", local.newname);
            } else {
              item.set("name", local.newname);
            }

            if (
              !isComponent &&
              rootComponentID === itemComponent.id &&
              rootComponentID
            ) {
              const doc = component.docs[rootComponentID];
              if (doc) {
                doc.transact(() => {
                  const comp = doc.getMap("map");
                  comp.set("name", local.newname);
                  const ctree = comp.get("content_tree");
                  if (ctree) {
                    const ccomp = ctree.get("component");
                    if (ccomp) {
                      ccomp.set("name", local.newname);
                    }
                  }
                });

                for (const g of Object.values(wsdoc.compGroup)) {
                  for (const c of g.comps) {
                    if (c.id === rootComponentID) {
                      c.name = local.newname;
                    }
                  }
                }
              }
            }
          }}
          autoFocus
        />
      ) : (
        <div className="text-sm flex-1 ">
          <>{itemName}</>
        </div>
      )}

      {!local.renaming && (
        <>
          {!!link && (
            <Tooltip content="Has Link">
              <svg
                width="10"
                height="10"
                viewBox="0 0 15 15"
                className="mr-[3px] text-blue-600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.51194 3.00541C9.18829 2.54594 10.0435 2.53694 10.6788 2.95419C10.8231 3.04893 10.9771 3.1993 11.389 3.61119C11.8009 4.02307 11.9513 4.17714 12.046 4.32141C12.4633 4.95675 12.4543 5.81192 11.9948 6.48827C11.8899 6.64264 11.7276 6.80811 11.3006 7.23511L10.6819 7.85383C10.4867 8.04909 10.4867 8.36567 10.6819 8.56093C10.8772 8.7562 11.1938 8.7562 11.389 8.56093L12.0077 7.94221L12.0507 7.89929C12.4203 7.52976 12.6568 7.2933 12.822 7.0502C13.4972 6.05623 13.5321 4.76252 12.8819 3.77248C12.7233 3.53102 12.4922 3.30001 12.1408 2.94871L12.0961 2.90408L12.0515 2.85942C11.7002 2.508 11.4692 2.27689 11.2277 2.11832C10.2377 1.46813 8.94398 1.50299 7.95001 2.17822C7.70691 2.34336 7.47044 2.57991 7.1009 2.94955L7.058 2.99247L6.43928 3.61119C6.24401 3.80645 6.24401 4.12303 6.43928 4.31829C6.63454 4.51355 6.95112 4.51355 7.14638 4.31829L7.7651 3.69957C8.1921 3.27257 8.35757 3.11027 8.51194 3.00541ZM4.31796 7.14672C4.51322 6.95146 4.51322 6.63487 4.31796 6.43961C4.12269 6.24435 3.80611 6.24435 3.61085 6.43961L2.99213 7.05833L2.94922 7.10124C2.57957 7.47077 2.34303 7.70724 2.17788 7.95035C1.50265 8.94432 1.4678 10.238 2.11799 11.2281C2.27656 11.4695 2.50766 11.7005 2.8591 12.0518L2.90374 12.0965L2.94837 12.1411C3.29967 12.4925 3.53068 12.7237 3.77214 12.8822C4.76219 13.5324 6.05589 13.4976 7.04986 12.8223C7.29296 12.6572 7.52943 12.4206 7.89896 12.051L7.89897 12.051L7.94188 12.0081L8.5606 11.3894C8.75586 11.1941 8.75586 10.8775 8.5606 10.6823C8.36533 10.487 8.04875 10.487 7.85349 10.6823L7.23477 11.301C6.80777 11.728 6.6423 11.8903 6.48794 11.9951C5.81158 12.4546 4.95642 12.4636 4.32107 12.0464C4.17681 11.9516 4.02274 11.8012 3.61085 11.3894C3.19896 10.9775 3.0486 10.8234 2.95385 10.6791C2.53661 10.0438 2.54561 9.18863 3.00507 8.51227C3.10993 8.35791 3.27224 8.19244 3.69924 7.76544L4.31796 7.14672ZM9.62172 6.08558C9.81698 5.89032 9.81698 5.57373 9.62172 5.37847C9.42646 5.18321 9.10988 5.18321 8.91461 5.37847L5.37908 8.91401C5.18382 9.10927 5.18382 9.42585 5.37908 9.62111C5.57434 9.81637 5.89092 9.81637 6.08619 9.62111L9.62172 6.08558Z"
                  fill="currentColor"
                ></path>
              </svg>
            </Tooltip>
          )}
          {!!adv.css && (
            <Tooltip content="Has CSS">
              <div
                className="bg-green-700 w-[7px] h-[7px] mr-[3px] hover:bg-green-900"
                onClick={() => {
                  c.editor.active = item;
                  const map = getMap<FMAdv>(c.editor.active, "adv");
                  c.editor.script.active = {
                    src: getMText(map, "css"),
                    type: "css",
                    default: `\
  & {
    display: flex;
    
    &:hover {
      display: flex;
    }
  }`,
                  };
                  c.render();
                }}
              ></div>
            </Tooltip>
          )}

          {!!adv.js && !adv.html && (
            <Tooltip content="Has JS">
              <div
                className="bg-orange-600 w-[7px] h-[7px] mr-[3px] hover:bg-orange-800"
                onClick={() => {
                  c.editor.active = item;
                  const map = getMap<FMAdv>(c.editor.active, "adv");
                  c.editor.script.active = {
                    src: getMText(map, "js"),
                    type: "js",
                    default: `\
<div {...props}>
  {children}
</div>`,
                  };
                  c.render();
                }}
              ></div>
            </Tooltip>
          )}

          {!!adv.html && (
            <Tooltip content="Has HTML">
              <div
                className="bg-blue-600 w-[7px] h-[7px] mr-[3px] hover:bg-blue-800"
                onClick={() => {
                  c.editor.active = item;
                  const map = getMap<FMAdv>(c.editor.active, "adv");
                  c.editor.script.active = {
                    src: getMText(map, "html"),
                    type: "html",
                  };
                  c.render();
                }}
              ></div>
            </Tooltip>
          )}
        </>
      )}

      {!local.renaming && (
        <div className="flex items-stretch action pl-[3px]">
          <>
            {canDelete && !isComponent ? (
              <>
                {
                  <>
                    <Tooltip
                      content="Rename"
                      className="flex items-center p-1 h-full text-blue-700"
                      onClick={() => {
                        local.renaming = true;
                        local.newname = item.get("name") || "";
                        local.render();
                      }}
                    >
                      <Rename />
                    </Tooltip>
                  </>
                }
              </>
            ) : (
              <>
                {!isPropContent && rootComponentID !== itemComponent.id && (
                  <Tooltip
                    content="Edit Component"
                    className="flex items-center border border-slate-500 bg-white rounded-sm text-[10px] px-[2px]"
                    onClick={() => {
                      let _c = c;
                      const compid = item.get("component")?.get("id") || "";
                      if (id.startsWith("COMP") && wsdoc.page) {
                        _c = wsdoc.page;
                        component.edit.switching = true;
                        setTimeout(() => {
                          component.edit.switching = false;
                          _c.editor.active = null;
                          component.edit.id = compid;
                          _c.render();
                        }, 10);
                      } else {
                        component.edit.switching = false;
                      }
                      component.edit.show = true;
                      if (!component.edit.tabs) component.edit.tabs = new Set();
                      component.edit.tabs?.add(compid);
                      _c.editor.lastActive.item = _c.editor.active;
                      _c.editor.active = null;
                      component.edit.id = compid;
                      _c.render();
                    }}
                  >
                    <>Edit</>
                  </Tooltip>
                )}

                <Tooltip
                  content="Rename"
                  className="flex items-center p-1 h-full text-blue-700"
                  onClick={() => {
                    local.renaming = true;
                    local.newname = item.get("name") || "";
                    local.render();
                  }}
                >
                  <Rename />
                </Tooltip>
              </>
            )}

            {canDelete && (
              <>
                <Tooltip
                  content="Duplicate"
                  className="flex items-center p-1 pr-[2px] h-full text-green-700"
                  onClick={() => {
                    item.parent.forEach((e: MContent, idx) => {
                      if (e === item) {
                        const json = e.toJSON() as IContent;
                        const map = newMap(fillID(json)) as MContent;
                        item.parent.insert(idx, [map]);
                      }
                    });
                  }}
                >
                  <Copy />
                </Tooltip>
              </>
            )}
          </>

          {canDelete && (
            <>
              <Tooltip
                content="Delete"
                className="flex items-center p-1 h-full text-red-700"
                onClick={() => {
                  item.parent.forEach((e, idx) => {
                    if (e === item) {
                      item.parent.delete(idx);
                    }
                  });
                }}
              >
                <Trash />
              </Tooltip>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const chevronSize = 13;
const elbowSize = 14;
const sectionSize = 17;
const actionSize = 13;

const Copy = () => (
  <svg
    width={actionSize}
    height={actionSize}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
  </svg>
);
const Text = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 15 15"
    className="opacity-50 mt-[1px] mb-[-1px]"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M3.95 2.95V4.5a.45.45 0 01-.9 0v-2a.45.45 0 01.45-.45h8a.45.45 0 01.45.45v2a.45.45 0 11-.9 0V2.95h-3v9.1h1.204a.45.45 0 010 .9h-3.5a.45.45 0 110-.9H6.95v-9.1h-3z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const Rename = () => (
  <svg
    width={actionSize}
    height={actionSize}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.5 1C6.22386 1 6 1.22386 6 1.5C6 1.77614 6.22386 2 6.5 2C7.12671 2 7.45718 2.20028 7.65563 2.47812C7.8781 2.78957 8 3.28837 8 4V11C8 11.7116 7.8781 12.2104 7.65563 12.5219C7.45718 12.7997 7.12671 13 6.5 13C6.22386 13 6 13.2239 6 13.5C6 13.7761 6.22386 14 6.5 14C7.37329 14 8.04282 13.7003 8.46937 13.1031C8.47976 13.0886 8.48997 13.0739 8.5 13.0591C8.51003 13.0739 8.52024 13.0886 8.53063 13.1031C8.95718 13.7003 9.62671 14 10.5 14C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13C9.87329 13 9.54282 12.7997 9.34437 12.5219C9.1219 12.2104 9 11.7116 9 11V4C9 3.28837 9.1219 2.78957 9.34437 2.47812C9.54282 2.20028 9.87329 2 10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1C9.62671 1 8.95718 1.29972 8.53063 1.89688C8.52024 1.91143 8.51003 1.92611 8.5 1.9409C8.48997 1.92611 8.47976 1.91143 8.46937 1.89688C8.04282 1.29972 7.37329 1 6.5 1ZM14 5H11V4H14C14.5523 4 15 4.44772 15 5V10C15 10.5523 14.5523 11 14 11H11V10H14V5ZM6 4V5H1L1 10H6V11H1C0.447715 11 0 10.5523 0 10V5C0 4.44772 0.447715 4 1 4H6Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
  </svg>
);

const Trash = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={actionSize}
    height={actionSize}
    fill="none"
    viewBox="0 0 15 15"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M5.5 1a.5.5 0 000 1h4a.5.5 0 000-1h-4zM3 3.5a.5.5 0 01.5-.5h8a.5.5 0 010 1H11v8a1 1 0 01-1 1H5a1 1 0 01-1-1V4h-.5a.5.5 0 01-.5-.5zM5 4h5v8H5V4z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export const ChevronRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={chevronSize}
    height={chevronSize}
    fill="none"
    viewBox="0 0 15 15"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M6.158 3.135a.5.5 0 01.707.023l3.75 4a.5.5 0 010 .684l-3.75 4a.5.5 0 11-.73-.684L9.566 7.5l-3.43-3.658a.5.5 0 01.023-.707z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export const ChevronDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={chevronSize}
    height={chevronSize}
    fill="none"
    viewBox="0 0 15 15"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M3.135 6.158a.5.5 0 01.707-.023L7.5 9.565l3.658-3.43a.5.5 0 01.684.73l-4 3.75a.5.5 0 01-.684 0l-4-3.75a.5.5 0 01-.023-.707z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const ItemIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={elbowSize}
    height={elbowSize}
    fill="none"
    viewBox="0 0 15 15"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1.49988 2.00012C1.77602 2.00012 1.99988 1.77626 1.99988 1.50012C1.99988 1.22398 1.77602 1.00012 1.49988 1.00012C1.22374 1.00012 0.999878 1.22398 0.999878 1.50012C0.999878 1.77626 1.22374 2.00012 1.49988 2.00012ZM4.49988 2.00012C4.77602 2.00012 4.99988 1.77626 4.99988 1.50012C4.99988 1.22398 4.77602 1.00012 4.49988 1.00012C4.22374 1.00012 3.99988 1.22398 3.99988 1.50012C3.99988 1.77626 4.22374 2.00012 4.49988 2.00012ZM7.99988 1.50012C7.99988 1.77626 7.77602 2.00012 7.49988 2.00012C7.22374 2.00012 6.99988 1.77626 6.99988 1.50012C6.99988 1.22398 7.22374 1.00012 7.49988 1.00012C7.77602 1.00012 7.99988 1.22398 7.99988 1.50012ZM10.4999 2.00012C10.776 2.00012 10.9999 1.77626 10.9999 1.50012C10.9999 1.22398 10.776 1.00012 10.4999 1.00012C10.2237 1.00012 9.99988 1.22398 9.99988 1.50012C9.99988 1.77626 10.2237 2.00012 10.4999 2.00012ZM13.9999 1.50012C13.9999 1.77626 13.776 2.00012 13.4999 2.00012C13.2237 2.00012 12.9999 1.77626 12.9999 1.50012C12.9999 1.22398 13.2237 1.00012 13.4999 1.00012C13.776 1.00012 13.9999 1.22398 13.9999 1.50012ZM1.49988 14.0001C1.77602 14.0001 1.99988 13.7763 1.99988 13.5001C1.99988 13.224 1.77602 13.0001 1.49988 13.0001C1.22374 13.0001 0.999878 13.224 0.999878 13.5001C0.999878 13.7763 1.22374 14.0001 1.49988 14.0001ZM1.99988 10.5001C1.99988 10.7763 1.77602 11.0001 1.49988 11.0001C1.22374 11.0001 0.999878 10.7763 0.999878 10.5001C0.999878 10.224 1.22374 10.0001 1.49988 10.0001C1.77602 10.0001 1.99988 10.224 1.99988 10.5001ZM1.49988 8.00012C1.77602 8.00012 1.99988 7.77626 1.99988 7.50012C1.99988 7.22398 1.77602 7.00012 1.49988 7.00012C1.22374 7.00012 0.999878 7.22398 0.999878 7.50012C0.999878 7.77626 1.22374 8.00012 1.49988 8.00012ZM1.99988 4.50012C1.99988 4.77626 1.77602 5.00012 1.49988 5.00012C1.22374 5.00012 0.999878 4.77626 0.999878 4.50012C0.999878 4.22398 1.22374 4.00012 1.49988 4.00012C1.77602 4.00012 1.99988 4.22398 1.99988 4.50012ZM13.4999 11.0001C13.776 11.0001 13.9999 10.7763 13.9999 10.5001C13.9999 10.224 13.776 10.0001 13.4999 10.0001C13.2237 10.0001 12.9999 10.224 12.9999 10.5001C12.9999 10.7763 13.2237 11.0001 13.4999 11.0001ZM13.9999 7.50012C13.9999 7.77626 13.776 8.00012 13.4999 8.00012C13.2237 8.00012 12.9999 7.77626 12.9999 7.50012C12.9999 7.22398 13.2237 7.00012 13.4999 7.00012C13.776 7.00012 13.9999 7.22398 13.9999 7.50012ZM13.4999 5.00012C13.776 5.00012 13.9999 4.77626 13.9999 4.50012C13.9999 4.22398 13.776 4.00012 13.4999 4.00012C13.2237 4.00012 12.9999 4.22398 12.9999 4.50012C12.9999 4.77626 13.2237 5.00012 13.4999 5.00012ZM4.99988 13.5001C4.99988 13.7763 4.77602 14.0001 4.49988 14.0001C4.22374 14.0001 3.99988 13.7763 3.99988 13.5001C3.99988 13.224 4.22374 13.0001 4.49988 13.0001C4.77602 13.0001 4.99988 13.224 4.99988 13.5001ZM7.49988 14.0001C7.77602 14.0001 7.99988 13.7763 7.99988 13.5001C7.99988 13.224 7.77602 13.0001 7.49988 13.0001C7.22374 13.0001 6.99988 13.224 6.99988 13.5001C6.99988 13.7763 7.22374 14.0001 7.49988 14.0001ZM10.9999 13.5001C10.9999 13.7763 10.776 14.0001 10.4999 14.0001C10.2237 14.0001 9.99988 13.7763 9.99988 13.5001C9.99988 13.224 10.2237 13.0001 10.4999 13.0001C10.776 13.0001 10.9999 13.224 10.9999 13.5001ZM13.4999 14.0001C13.776 14.0001 13.9999 13.7763 13.9999 13.5001C13.9999 13.224 13.776 13.0001 13.4999 13.0001C13.2237 13.0001 12.9999 13.224 12.9999 13.5001C12.9999 13.7763 13.2237 14.0001 13.4999 14.0001ZM3.99988 5.00012C3.99988 4.44784 4.44759 4.00012 4.99988 4.00012H9.99988C10.5522 4.00012 10.9999 4.44784 10.9999 5.00012V10.0001C10.9999 10.5524 10.5522 11.0001 9.99988 11.0001H4.99988C4.44759 11.0001 3.99988 10.5524 3.99988 10.0001V5.00012ZM4.99988 5.00012H9.99988V10.0001H4.99988V5.00012Z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const SectionRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={sectionSize}
    height={sectionSize}
    fill="none"
    viewBox="0 0 15 15"
  >
    <path fill="currentColor" d="M6 11V4l4.5 3.5L6 11z"></path>
  </svg>
);

const SectionDown = () => (
  <svg
    width={sectionSize}
    height={sectionSize}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 6H11L7.5 10.5L4 6Z" fill="currentColor"></path>
  </svg>
);
