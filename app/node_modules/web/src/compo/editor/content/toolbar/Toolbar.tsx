import { ToolbarLeft } from "./left/ToolbarLeft";
import { ToolbarMid } from "./middle/ToolbarMid";
import { ToolbarRight } from "./right/ToolbarRight";

export const Toolbar = () => {
  return (
    <div className={cx("toolbar", "flex")}>
      <ToolbarLeft />
      <ToolbarMid />
      <ToolbarRight />
    </div>
  );
};
