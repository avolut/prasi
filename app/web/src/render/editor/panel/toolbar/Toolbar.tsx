// import { ToolbarLeft } from "./left/ToolbarLeft";
// import { ToolbarMid } from "./middle/ToolbarMid";
import { useGlobal, useLocal } from "web-utils";
import { ToolbarCenter } from "./center/ToolbarCenter";
import { ToolbarLeft } from "./left/ToolbarLeft";
import { ToolbarRight } from "./right/ToolbarRight";
import { EditorGlobal } from "../../logic/global";

export const Toolbar = () => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const local = useLocal({});
  p.softRender.topR = local.render;

  const danger =
    (p.wsPing < 0 || !p.ws || (p.ws && p.ws.readyState !== p.ws.OPEN)) &&
    p.status === "ready";

  return (
    <div
      className={cx(
        "toolbar",
        "flex",
        danger && "bg-red-500 ",
        danger &&
          css`
            * {
              color: white;
            }
          `
      )}
    >
      <ToolbarLeft />
      <ToolbarCenter />
      <ToolbarRight />
    </div>
  );
};
