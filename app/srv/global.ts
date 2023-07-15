import { site, user } from "dbgen";
import { ExecaChildProcess } from "execa";

export const glb = global as unknown as {
  lastUpdate: Record<string, number>;
  prasiSrv: {
    installing: Set<string>;
    running: Record<string, ExecaChildProcess>;
  };
};

export type Session = {
  user: user & { site: site[] };
};
