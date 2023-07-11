import { prepareDB } from "./prepare/db";
import { prepareSrv } from "./prepare/srv";
import { prepareWeb } from "./prepare/web";

export const prepareBuild = async (
  name: string,
  mark?: Set<string> | undefined
) => {
  if (name.startsWith("db")) return await prepareDB(name, mark);
  if (name.startsWith("srv")) return await prepareSrv(name, mark);
  if (name.startsWith("web")) return await prepareWeb(name, mark);
  return { shouldRestart: false };
};
