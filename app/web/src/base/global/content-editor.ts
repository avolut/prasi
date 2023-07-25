import { NodeModel, TreeMethods } from "@minoru/react-dnd-treeview";
import { component } from "dbgen";
import * as Y from "yjs";
import { TypedDoc, TypedMap } from "yjs-types";
import { NodeContent } from "../../compo/page/tools/flatten-tree";
import { MContent } from "../../compo/types/general";
import { IItem, MItem } from "../../compo/types/item";
import { FMComponent } from "../../compo/types/meta-fn";
import { MRoot } from "../../compo/types/root";
import { SingleScope } from "../../compo/types/script";
export type CompMap = TypedMap<
  Omit<component, "content_tree" | "component" | "updated_at"> & {
    content_tree: MItem;
    component: FMComponent;
    updated_at: string;
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
  instances: {} as Record<string, IItem>,
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
      reload: false,
    },
    page: {
      reload: false,
      render: () => {},
    },
    componentActiveID: "",
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
    },
  },
  scope: {
    tree: {},
    effect: {},
    value: {},
    evargs: {},
    types: {},
  } as SingleScope,
  global: {
    scss: "",
    api_url: "",
  },
};
