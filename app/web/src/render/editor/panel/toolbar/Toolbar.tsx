// import { ToolbarLeft } from "./left/ToolbarLeft";
// import { ToolbarMid } from "./middle/ToolbarMid";
import { ToolbarCenter } from "./center/ToolbarCenter";
import { ToolbarLeft } from "./left/ToolbarLeft";
import { ToolbarRight } from "./right/ToolbarRight";

export const Toolbar = () => {
  return (
    <div className={cx("toolbar", "flex")}>
      <ToolbarLeft />
      <ToolbarCenter />
      <ToolbarRight />
    </div>
  );
};
