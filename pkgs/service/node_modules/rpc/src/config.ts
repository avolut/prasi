import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { dir } from "dir";
import getPort from "get-port";

type Config = {
  port: number;
  rpc: Record<string, any>;
};

export const config = new Proxy(
  {
    _path: "",
    _raw: null as unknown as Config,
  },
  {
    get(target, p: keyof Config, receiver) {
      initConf(target);
      return target._raw[p];
    },
    set(target, p: keyof Config, newValue, receiver) {
      initConf(target);
      target._raw[p] = newValue;

      writeFileSync(target._path, JSON.stringify(target._raw, null, 2));
      return true;
    },
  }
) as unknown as Config;

const initConf = (target: { _path: string; _raw: null | Config }) => {
  target._path = join(process.cwd(), "rpc.json");
  try {
    if (existsSync(join(process.cwd(), "base"))) {
      target._path = dir.root(".output/app/rpc.json");
    }

    if (existsSync(target._path)) {
      const json = readFileSync(target._path, "utf-8");
      target._raw = JSON.parse(json);
    } else {
      mkdirSync(dirname(target._path), { recursive: true });
    }
  } catch (e) {}

  if (!target._raw) {
    target._raw = {
      port: 0,
      rpc: {},
    } as Config;
  }
};
