import { ToolbarBox } from "../../../../ui/box";
import { wsdoc } from "../../../ws/wsdoc";
import { ResponsiveToggle } from "./ResponsiveToggle";

export const ToolbarRight = () => {
  return (
    <div className={cx("toolbar-right", "flex mr-2")}>
      <ToolbarBox
        items={[
          {
            content: "Preview",
            onClick: () => {
              window.open(
                `/site/${wsdoc.site?.id}?p=${wsdoc.page_id}&preview=1`,
                "_blank"
              );
            },
          },
        ]}
        className={cx(
          css`
            margin-right: 5px !important;
          `
        )}
      />

      <ResponsiveToggle />
    </div>
  );
};
