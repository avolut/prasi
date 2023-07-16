import { useLocal } from "web-utils";
import { ToolbarBox } from "../../../../ui/box";
import { Popover } from "../../../../ui/popover";
import { APIConfig } from "./api/APIConfig";
import { AddElement } from "./AddElement";

export const ToolbarMid = () => {
  const local = useLocal({
    apiConfigOpen: false,
  });
  return (
    <div className={cx("toolbar-mid", "flex")}>
      <ToolbarBox
        items={[
          {
            onClick: () => {
              local.apiConfigOpen = true;
              local.render();
            },
            content: (
              <Popover
                offset={12}
                open={local.apiConfigOpen}
                content={
                  <APIConfig
                    close={() => {
                      local.apiConfigOpen = false;
                      local.render();
                    }}
                  />
                }
                onOpenChange={(open) => {
                  local.apiConfigOpen = open;
                  local.render();
                }}
              >
                <div className={"api transition-all"}>API</div>
              </Popover>
            ),
          },
        ]}
      />
      <AddElement id={"PAGE"} />
    </div>
  );
};

const IconPlus = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    fill="none"
    viewBox="0 0 15 15"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 2.75a.5.5 0 00-1 0V7H2.75a.5.5 0 000 1H7v4.25a.5.5 0 001 0V8h4.25a.5.5 0 000-1H8V2.75z"
      clipRule="evenodd"
    ></path>
  </svg>
);
