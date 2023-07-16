import { page as dbpage } from "dbgen";
import { TypedDoc, TypedMap } from "yjs-types";
import { loadSite } from "../../../../srv/edit/tools/load-site";
import { IItem, MItem } from "./item";
import { IRoot, MRoot } from "./root";
import { ISection, MSection } from "./section";
import { IText, MText } from "./text";
export type PageProps = {
  pathname: string;
  domain: string;
  params: any;
};

export type PrasiAPI = {
  apiEntry: any;
  prismaTypes: {
    "prisma.d.ts": string;
    "runtime/library.d.ts": string;
    "runtime/index.d.ts": string;
  };
  apiTypes: string;
};

export const w = window as unknown as {
  isEditor: boolean;
  prasiApi: Record<string, PrasiAPI>;
  loadedFonts: string[];
  prasiApiDbPull: boolean;
};

export type Page = {
  id: string;
  content_tree: IRoot;
  js: string | null;
  js_compiled: string | null;
};
export type MPage = TypedDoc<{
  map: TypedMap<
    Omit<dbpage, "content_tree"> & {
      content_tree: MRoot;
    }
  >;
}>;
export type Site = Exclude<Awaited<ReturnType<typeof loadSite>>, null>;

export type IContent = ISection | IItem | IText;
export type MContent = MSection | MItem | MText;

export type RenderContentProp = Partial<{
  active: IContent | null;
  hover: IContent | null;
  update: (updateID: string, name: string, newState: IRoot) => void;
  onHover: (e: React.MouseEvent, item: IContent) => Promise<void>;
  onOut: (e: React.MouseEvent, item: IContent) => Promise<void>;
  onClick: (e: React.MouseEvent, item: IContent) => Promise<void>;
  isEditor: boolean;
  setContent: (item: IContent) => Promise<void>;
  _onlyChildren?: true;
}>;

export type ERenderProp<ITEM> = {
  item: ITEM;
};
