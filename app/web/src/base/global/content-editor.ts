import { NodeModel, TreeMethods } from "@minoru/react-dnd-treeview";
import { component } from "dbgen";
import * as Y from "yjs";
import { TypedDoc, TypedMap } from "yjs-types";
import { MItem } from "../../utils/types/item";
import { FMComponent } from "../../utils/types/meta-fn";
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