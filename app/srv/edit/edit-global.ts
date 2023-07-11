import { component } from "dbgen";
import { Websocket } from "hyper-express";
import { RadixRouter } from "service/pkgs/service-web/pkgs/web-init";
import { UndoManager } from "yjs";
import { TypedArray, TypedDoc, TypedMap } from "yjs-types";
import { Site } from "../../web/src/compo/types/general";
import { IItem } from "../../web/src/compo/types/item";
import { IRoot } from "../../web/src/compo/types/root";

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type SingleComp = {
  id: string;
  doc: TypedDoc<{
    map: TypedMap<component & { content_tree: TypedMap<IItem> }>;
  }>;
  undoManager: UndoManager;
  saveTimeout?: ReturnType<typeof setTimeout>;
  ws: Set<Websocket>;
};

export const eg = global as unknown as {
  cache: Record<
    string,
    Record<
      string,
      {
        id: string;
        js: string | null;
        url: string;
        js_compiled: string | null;
        content_tree: IRoot;
        lastRefresh: number;
      }
    >
  >;
  router: Record<string, RadixRouter<{ id: string; url: string }>>;
  edit: {
    site: Record<
      string,
      {
        id: string;
        doc: TypedDoc<{
          site: TypedMap<
            Site & { page: TypedArray<ArrayElement<Site["page"]>> }
          >;
        }>;
        undoManager: UndoManager;
        saveTimeout?: ReturnType<typeof setTimeout>;
        ws: Set<Websocket>;
      }
    >;
    comp: Record<string, SingleComp>;
    page: Record<
      string,
      {
        id: string;
        doc: TypedDoc<{
          map: TypedMap<{
            url: string;
            js: string;
            js_compiled: string;
            content_tree: TypedMap<IRoot>;
          }>;
        }>;
        undoManager: UndoManager;
        saveTimeout?: ReturnType<typeof setTimeout>;
        ws: Set<Websocket>;
      }
    >;
    ws: WeakMap<Websocket, { clientID: string }>;
  };
};
