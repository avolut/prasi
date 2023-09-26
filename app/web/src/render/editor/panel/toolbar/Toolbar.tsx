// import { ToolbarLeft } from "./left/ToolbarLeft";
// import { ToolbarMid } from "./middle/ToolbarMid";
import { useGlobal } from "web-utils";
import { ToolbarCenter } from "./center/ToolbarCenter";
import { ToolbarLeft } from "./left/ToolbarLeft";
import { ToolbarRight } from "./right/ToolbarRight";
import { EditorGlobal } from "../../logic/global";

export const Toolbar = () => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  return (
    <div
      className={cx(
        "toolbar",
        "flex",
        p.wsPing < 0 && "bg-red-500 ",
        p.wsPing < 0 &&
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
