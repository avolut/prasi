import { syncronize } from "y-pojo";
import * as Y from "yjs";
import { TypedArray, TypedMap } from "yjs-types";

export const getArray = <T extends any>(map: TypedMap<any>, key: string) => {
  let item = map.get(key);
  if (!item) {
    map.set(key, new Y.Array());
    item = map.get(key);
  }

  return item as TypedArray<T> | undefined;
};

export const newMap = (item: any) => {
  const map = new Y.Map();
  syncronize(map, item as any);
  return map;
};

export const getMap = <T extends any>(
  map: TypedMap<any>,
  key: string,
  fill?: any
) => {
  let item = map.get(key);
  if (!item) {
    map.set(key, new Y.Map() as any);
    item = map.get(key);

    if (fill && item) {
      syncronize(item as any, fill);
    }
  }

  return item as T;
};

export const getMText = (map: TypedMap<any>, key: string) => {
  let item = map.get(key);
  if (typeof item === "string") {
    map.set(key, new Y.Text(item));
    item = map.get(key);
  } else if (typeof item === "object" && item instanceof Y.Text) {
  } else {
    item = new Y.Text();
    map.set(key, item);
  }

  return item as Y.Text;
};
