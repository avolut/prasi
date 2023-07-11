import { dir } from "dir";
import { existsSync } from "fs";

export type ServiceModule<T> = T & { load: () => ServiceModule<T> };

export const serviceModule = <T extends { load: () => void }>({
  mode,
  name,
}: {
  name: string;
  mode: "dev" | "staging" | "prod";
}): T => {
  const rawpath = dir.path(`${name}/module.js`);

  if (existsSync(rawpath)) {
    const path = require.resolve(rawpath);
    const result = {
      import: {} as T,
    };
    const load = () => {
      delete require.cache[path];
      result.import = require(path);

      if (typeof result.import === "object") {
        result.import.load = load;
      }

      return result.import; 
    };

    return load();
  }

  return {} as T;
};
