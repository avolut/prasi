import ParcelWatcher, {
  subscribe,
  SubscribeCallback,
  AsyncSubscription,
} from "@parcel/watcher";
import { dir } from "dir";
import { sep } from "path";

type SingleWatch = {
  dir: string;
  event?: SubscribeCallback;
  depth?: number;
};

export const watcher = {
  _watches: {} as Record<string, Set<SingleWatch>>,
  _watcher: null as unknown as AsyncSubscription,
  async dispose() {
    if (this._watcher) this._watcher.unsubscribe();
  },
  async watch(item: SingleWatch) {
    if (!this._watches[item.dir]) {
      this._watches[item.dir] = new Set();
    }
    this._watches[item.dir].add(item);

    if (!this._watcher) {
      this._watcher = await subscribe(
        dir.root(),
        (err, changes) => {

          const keys = Object.keys(this._watches);
          const matcher = new Map<SingleWatch, ParcelWatcher.Event[]>();
          for (const c of changes) {
            const match = keys.filter((e) => c.path.startsWith(e));
            if (match.length > 0) {
              for (const dir of match) {
                const depth = c.path.substring(dir.length + 1).split(sep);

                const watches = this._watches[dir];
                watches.forEach((e) => {
                  if (e.event) {
                    if (!e.depth || (e.depth && depth.length <= e.depth)) {
                      if (!matcher.has(e)) matcher.set(e, [c]);
                      else {
                        const found = matcher.get(e);
                        found?.push(c);
                      }
                    }
                  }
                });
              }
            }
          }

          // console.log(
          //   changes.map((e) => [
          //     e.type,
          //     e.path.substring(dir.root().length + 1),
          //   ]),
          //   matcher.size
          // );

          for (const [e, v] of matcher) {
            if (e.event) e.event(err, v);
          }
        },
        {
          ignore: [
            "**/app/gen/**",
            "**/.**",
            "**/.output/**",
          ],
        }
      );
    }
  },
};
