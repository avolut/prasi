import { ToolbarBox } from "../../../../ui/box";
import { Popover } from "../../../../ui/popover";
import { wsdoc } from "../../../ws/wsdoc";
import { AutoHeightTextarea } from "../../side/panel/link";
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
                `/site/${wsdoc.site?.domain}?page_id=${wsdoc.page_id}`,
                "_blank"
              );
            },
          },
          {
            content: (
              <Popover
                autoFocus={false}
                backdrop={false}
                popoverClassName="bg-white"
                placement="bottom"
                content={
                  <AutoHeightTextarea
                    className="p-2 border border-blue-500  font-mono text-[11px] w-[300px]"
                    autoFocus
                    spellCheck={false}
                    onFocus={(e) => { e.currentTarget.select() }}
                    value={`${location.protocol}//${location.host}/site/${wsdoc.site?.domain}?page_id=${wsdoc.page_id}`}
                  />
                }
              >
                URL
              </Popover>
            ),
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
