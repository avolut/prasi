import { UseStore, del, getMany, keys } from "idb-keyval";
import { useGlobal, useLocal } from "web-utils";
import { EditorGlobal } from "../../../logic/global";
import { Tooltip } from "../../../../../utils/ui/tooltip";

export const MonacoElHistory = ({
  store,
  close,
  doEdit,
}: {
  store: UseStore;
  close: () => void;
  doEdit: (newval: string, all?: boolean) => Promise<void>;
}) => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const local = useLocal(
    { history: [] as { ts: number; key: string; src: string }[] },
    async () => {
      const listkeys = await keys(store);
      const meta = p.treeMeta[p.item.active];
      const id = meta.item.originalId || meta.item.id;
      const foundkeys = [] as any[];
      if (p.script.prop) {
        for (const key of listkeys) {
          if (key.toString().startsWith(`${id}@${p.script.prop.name}-`)) {
            foundkeys.push(key);
          }
        }
      } else {
        for (const key of listkeys) {
          if (key.toString().startsWith(`${id}:${p.script.type}-`)) {
            foundkeys.push(key);
          }
        }
      }

      const items = await getMany(foundkeys, store);
      local.history = [];

      for (const [k, src] of Object.entries(items)) {
        let ts = "";
        const key = foundkeys[parseInt(k)];

        if (p.script.prop) {
          if (p.script.prop.mode === "instance") {
            if (key.startsWith(`${id}@${p.script.prop.name}-`)) {
              ts = key.substring(`${id}@${p.script.prop.name}-`.length);
            }
          } else if (p.script.prop.mode === "master-visible") {
            if (key.startsWith(`${id}#vis-${p.script.prop.name}-`)) {
              ts = key.substring(`${id}#vis-${p.script.prop.name}-`.length);
            }
          } else if (p.script.prop.mode === "master-option") {
            if (key.startsWith(`${id}#opt-${p.script.prop.name}-`)) {
              ts = key.substring(`${id}#opt-${p.script.prop.name}-`.length);
            }
          } else if (p.script.prop.mode === "master-gen") {
            if (key.startsWith(`${id}#gen-${p.script.prop.name}-`)) {
              ts = key.substring(`${id}#gen-${p.script.prop.name}-`.length);
            }
          } else if (p.script.prop.mode === "master-value") {
            if (key.startsWith(`${id}#val-${p.script.prop.name}-`)) {
              ts = key.substring(`${id}#val-${p.script.prop.name}-`.length);
            }
          }
        } else {
          ts = key.substring(`${id}:${p.script.type}-`.length);
        }
        local.history.push({ ts: parseInt(ts) * 10000, key, src });
      }
      local.render();
    }
  );

  return (
    <div className="relative overflow-auto w-[200px] h-[250px] -my-[3px] -mx-[8px]">
      <div className="p-1">Local History:</div>
      <div className="absolute left-0 right-0 h-[1000px] border-t">
        {local.history.reverse().map((e, idx) => {
          return (
            <Tooltip
              key={idx}
              content={
                <div className="font-mono text-[10px] whitespace-pre-wrap">
                  {e.src}
                </div>
              }
              placement="left"
              delay={0}
            >
              <div
                className="border-b px-2 justify-between flex hover:bg-blue-100 cursor-pointer"
                onClick={async () => {
                  doEdit(e.src, true);
                  close();
                }}
              >
                <div>{timeAgo(e.ts).toString()}</div>
                <div>{formatBytes(e.src.length)}</div>
              </div>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

const timeAgo = (time: number | string | Date) => {
  switch (typeof time) {
    case "number":
      break;
    case "string":
      time = +new Date(time);
      break;
    case "object":
      if (time.constructor === Date) time = time.getTime();
      break;
    default:
      time = +new Date();
  }
  const time_formats = [
    [60, "seconds", 1], // 60
    [120, "1 minute ago", "1 minute from now"], // 60*2
    [3600, "minutes", 60], // 60*60, 60
    [7200, "1 hour ago", "1 hour from now"], // 60*60*2
    [86400, "hours", 3600], // 60*60*24, 60*60
    [172800, "yesterday", "tomorrow"], // 60*60*24*2
    [604800, "days", 86400], // 60*60*24*7, 60*60*24
    [1209600, "last week", "next week"], // 60*60*24*7*4*2
    [2419200, "weeks", 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, "last month", "next month"], // 60*60*24*7*4*2
    [29030400, "months", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, "last year", "next year"], // 60*60*24*7*4*12*2
    [2903040000, "years", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, "last century", "next century"], // 60*60*24*7*4*12*100*2
    [58060800000, "centuries", 2903040000], // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ];
  /* @ts-ignore */
  let seconds = (+new Date() - time) / 1000,
    token = "ago",
    list_choice = 1;

  if (seconds == 0) {
    return "Just now";
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = "from now";
    list_choice = 2;
  }
  let i = 0,
    format;
  /* eslint-disable no-cond-assign */
  while ((format = time_formats[i++]))
    if (seconds < (format[0] as any)) {
      if (typeof format[2] == "string") return format[list_choice];
      else
        return Math.floor(seconds / format[2]) + " " + format[1] + " " + token;
    }
  return time;
};

function formatBytes(bytes: any, decimals?: any) {
  if (bytes == 0) return "0 Bytes";
  var k = 1024,
    dm = decimals || 2,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
