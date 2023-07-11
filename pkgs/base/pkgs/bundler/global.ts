import { BuildContext } from "esbuild";
import { IPty } from "utility/spawn";

export const bundler = globalThis as unknown as {
  runs: Record<string, Set<IPty>>;
  lastRunArgs: Record<string, any>;
  bundlers: Set<BuildContext>;
  restart: Set<string>;
};

if (!bundler.runs) bundler.runs = {};
