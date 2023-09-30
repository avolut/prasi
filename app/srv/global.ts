import { site, user } from "dbgen";
import { ExecaChildProcess } from "execa";

export const glb = global as unknown as {
  lastUpdate: Record<string, number>;
  prasiSrv: {
    status: Record<
      string,
      | "unavailable"
      | "installing"
      | "starting"
      | "started"
      | "stopped"
      | "destroying"
    >;
    running: Record<string, ExecaChildProcess>;
  };
  npm: {
    page: Record<string, null | { file: Buffer; etag: string }>;
    site: Record<string, null | { file: Buffer; etag: string }>;
  };
};

export type Session = {
  user: user & { site: site[] };
};
