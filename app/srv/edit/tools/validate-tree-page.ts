import { Websocket } from "hyper-express";
import { syncronize } from "y-pojo";
import * as Y from "yjs";
import { fillID } from "../../../web/src/utils/page/tools/fill-id";
import { IContent, MContent } from "../../../web/src/utils/types/general";
import { IItem } from "../../../web/src/utils/types/item";
import { IRoot } from "../../../web/src/utils/types/root";
import { getComp } from "../action/get-comp";
import { eg } from "../edit-global";

const MAX_STRING_LENGTH = 15000;
export const validateTreeMap = async (
  ws: Websocket,
  item: MContent,
  changed?: boolean
) => {
  let _changed = changed;
  const type = item.get("type") as IContent["type"] | "root";
  if (type !== "root") {
    item.forEach((val, key, map) => {
      if (typeof val === "string") {
        if (val.length > MAX_STRING_LENGTH) {
          map.set(key, "");
          _changed = true;
        }
      } else {
        if (typeof val === "object" && val instanceof Y.Map) {
          val._map.forEach((ival, ikey, imap) => {
            if (typeof ival === "string") {
              if ((ival as string).length > MAX_STRING_LENGTH) {
                imap.set(ikey, "" as any);
                _changed = true;
              }
            }
          });
        }
      }
    });
  }

  if (item) {
    if (type !== "text") {
      const childs = item.get("childs");
      if (childs) {
        for (const c of childs) {
          if (await validateTreeMap(ws, c)) {
            _changed = true;
          }
        }
      }
    }
  }
  return !!_changed;
};
