import type { main as db } from "../db/main"
import type { main as srv } from "../srv/main"
import type { main as web } from "../web/main"

export type SVCAction = {
  db: typeof db;
  srv: typeof srv;
  web: typeof web
}
  