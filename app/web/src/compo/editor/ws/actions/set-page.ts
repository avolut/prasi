import { decompress } from "lz-string";
import * as Y from "yjs";
import { MPage } from "../../../types/general";
import { WS_MSG_SET_PAGE } from "../msg";
export const setPage = async (msg: WS_MSG_SET_PAGE) => {
  const page = Uint8Array.from(
    decompress(msg.changes)
      .split(",")
      .map((x) => parseInt(x, 10))
  );

  const doc = new Y.Doc();
  Y.applyUpdate(doc as any, page, "remote");

  return doc as unknown as MPage;
};
