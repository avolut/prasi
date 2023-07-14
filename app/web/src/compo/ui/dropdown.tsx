import { FC, ReactNode, useEffect } from "react";
import { Virtuoso as List, VirtuosoHandle } from "react-virtuoso";
import { useLocal } from "web-utils";
import { Popover } from "./popover";

type DropdownItem = { label: string; value: string } | string;

type DropdownExtProp = {
  value?: string;
  items?: DropdownItem[];
  popover?: {
    className?: string;
    itemClassName?: string;
    renderItem?: (val: DropdownItem, idx: number) => ReactNode;
  };
  onChange?: (value: string, idx: number, item: DropdownItem) => void;
};

export const Dropdown: FC<
  Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    keyof DropdownExtProp
  > &
    DropdownExtProp
> = (prop) => {
  const local = useLocal({
    open: false,
    search: "",
    searchChanged: false,
    status: "init" as "init" | "ready",
    itemsCache: prop.items,
    activeIdx: -1,
    listEl: null as null | VirtuosoHandle,
    listElTimeout: null as any,
    scrolled: false,
  });

  useEffect(() => {
    if (!local.open) {
      local.scrolled = false;
      local.render();
    }
  }, [local.open]);

  const resetInputValue = () => {
    if (prop.items) {
      const val = prop.value || "";
      let idx = 0;
      for (const item of prop.items) {
        if (typeof item === "string" && item === val) {
          local.search = item;
          local.activeIdx = idx;
        } else if (typeof item === "object" && item.value === val) {
          local.search = item.label;
          local.activeIdx = idx;
        }
        local.searchChanged = false;
        idx++;
      }
    }
  };

  if (local.status === "init" || prop.items !== local.itemsCache) {
    local.status = "ready";
    local.itemsCache = prop.items;
    resetInputValue();
  }

  const elProp = { ...prop };
  delete elProp["value"];
  delete elProp["items"];
  delete elProp["onChange"];
  delete elProp["popover"];

  let items = prop.items || [];
  if (local.searchChanged) {
    local.searchChanged = false;

    const search = local.search.toLowerCase().replace(/\W/, "");
    if (search) {
      items = [];
      for (const item of prop.items || []) {
        if (
          typeof item === "string" &&
          item.toLowerCase().replace(/\W/, "").includes(search)
        ) {
          items.push(item);
        } else if (
          typeof item === "object" &&
          (item.label.toLowerCase().replace(/\W/, "").includes(search) ||
            item.value.toLowerCase().replace(/\W/, "").includes(search))
        ) {
          items.push(item);
        }
      }
    }
  }

  return (
    <Popover
      open={local.open}
      onOpenChange={(open) => {
        local.open = open;
        local.render();
      }}
      autoFocus={false}
      placement="bottom-start"
      backdrop={false}
      arrow={false}
      offset={0}
      popoverClassName={cx("bg-white border", prop.popover?.className)}
      content={
        <>
          {items.length > 0 ? (
            <List
              className={`${
                items.length > 3
                  ? "min-h-[100px] max-h-[350px]"
                  : items.length === 3
                  ? "min-h-[85px]"
                  : items.length === 1
                  ? "min-h-[30px]"
                  : "min-h-[57px]"
              } min-w-[200px] flex-1 w-full`}
              data={items}
              ref={(el) => {
                if (el && !local.scrolled) {
                  clearTimeout(local.listElTimeout);
                  local.listElTimeout = setTimeout(() => {
                    local.scrolled = true;
                    local.listEl = el;
                    el.scrollToIndex(local.activeIdx - 2);
                  }, 50);
                }
              }}
              itemContent={(idx, e) => {
                return (
                  <div
                    key={typeof e === "string" ? e : e.value}
                    className={cx(
                      "cursor-pointer",
                      prop.value === (typeof e === "string" ? e : e.value) &&
                        "active",
                      prop.popover?.itemClassName
                        ? prop.popover?.itemClassName
                        : "hover:bg-blue-100 border-b px-2 whitespace-nowrap select-none"
                    )}
                    onClick={() => {
                      local.open = false;
                      local.status === "init";
                      if (prop.onChange) {
                        prop.onChange(
                          typeof e === "string" ? e : e.value,
                          idx,
                          e
                        );
                      }
                      local.render();
                    }}
                  >
                    {prop.popover?.renderItem
                      ? prop.popover.renderItem(e, idx)
                      : typeof e === "string"
                      ? e
                      : e.label}
                  </div>
                );
              }}
            ></List>
          ) : (
            <div className="min-h-[100px] min-w-[250px] flex-1 w-full"></div>
          )}
        </>
      }
      {...elProp}
      className={cx(
        "dropdown bg-white px-2 relative flex items-stretch",
        elProp.className
      )}
    >
      <>
        <div className="pointer-events-none absolute right-0 bottom-0 top-0 bg-white flex items-center justify-center w-[30px] ">
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
              d="M3.135 6.158a.5.5 0 01.707-.023L7.5 9.565l3.658-3.43a.5.5 0 01.684.73l-4 3.75a.5.5 0 01-.684 0l-4-3.75a.5.5 0 01-.023-.707z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          className={cx("cursor-pointer outline-none input flex-1")}
          type="string"
          placeholder={elProp.placeholder}
          spellCheck={false}
          value={local.search}
          onChange={(e) => {
            local.search = e.currentTarget.value;
            local.searchChanged = true;
            local.render();
          }}
          onFocus={() => {
            local.open = true;
            local.render();
          }}
        />
      </>
    </Popover>
  );
};
