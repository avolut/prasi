import { site, user } from "dbgen";

export const glb = global as unknown as {
  lastUpdate: Record<string, number>;
};

export type Session = {
  user: user & { site: site[] };
};
