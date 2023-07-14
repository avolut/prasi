import { NodeModel, TreeMethods } from "@minoru/react-dnd-treeview";
import { component } from "dbgen";
import * as Y from "yjs";
import { TypedDoc, TypedMap } from "yjs-types";
import { NodeContent } from "../../compo/page/tools/flatten-tree";
import { MContent } from "../../compo/types/general";
import { MItem } from "../../compo/types/item";
import { FMComponent } from "../../compo/types/meta-fn";
import { MRoot } from "../../compo/types/root";
export type CompMap = TypedMap<
  Omit<component, "content_tree" | "component"> & {
    content_tree: MItem;
    component: FMComponent;
  }
>;
export type CompDoc = TypedDoc<{
  map: CompMap;
}>;
export const CEGlobal = {
  doc: null as unknown as TypedDoc<{
    map: TypedMap<{ id: string; content_tree: MContent }>;
  }>,
  map: null as unknown as TypedMap<{ content_tree: MContent }>,
  root: null as unknown as MRoot | MItem,
  editor: {
    manager: {
      showSite: false,
      showPage: false,
      showComp: false,
      compCallback: (comp?: { id: string; name: string }) => {},
    },
    focusedTextID: "",
    enabled: false,
    tree: {
      method: null as TreeMethods | null,
      list: [] as NodeModel<NodeContent>[],
      render: () => {},
    },
    page: {
      render: () => {},
    },
    componentActiveID: "",
    activeScopeName: undefined as undefined | string,
    active: null as null | MContent,
    multiple: {
      active: null as null | Array<MContent>,
      activeEl: null as null | Array<HTMLElement>,
    },
    lastActive: {
      item: null as null | MContent,
      multiple: {
        active: null as null | Array<MContent>,
        activeEl: null as null | Array<HTMLElement>,
      },
    },
    copy: null as null | "multiple",
    activeEl: null as HTMLElement | null,
    hover: null as null | MContent,
    script: {
      active: null as null | {
        src: null | Y.Text;
        type: "js" | "css" | "html";
        default?: string;
      },
      tab: {
        list: [] as {
          name: string;
          type: "js" | "css" | "html";
        }[],
        idx: 0,
      },
    },
  },
  scope: {} as Record<string, SingleScope>,
  global: {
    scss: "",
    api_url: "",
  },
};

export type SingleScope = {
  value: Record<string, any>;
  effect: Record<
    string,
    { name: string; effect: (local: any) => any; }
  >;
  tree: Record<
    string,
    {
      childs: Set<string>;
      // type: string;
      // name: string;
      // lv: number;
      parent_id: string;
    }
  >;
  evargs: Record<string, { local: any; passprop: any }>;
};
