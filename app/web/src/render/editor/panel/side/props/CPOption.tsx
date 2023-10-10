import { FC, useEffect } from "react";
import { CPArgs } from "./types";
import { CPCoded } from "./CPCoded";
import { useGlobal, useLocal } from "web-utils";
import { Loading } from "../../../../../utils/ui/loading";
import Downshift from "downshift";
import { EditorGlobal } from "../../../logic/global";

export const CPOption: FC<CPArgs> = ({ prop, onChange, editCode, reset }) => {
  const local = useLocal({
    codeEditing: false,
    loading: false,
    loaded: false as any,
    isOpen: false,
    val: "",
    metaFn: null as null | (() => Promise<{ label: string; value: any }[]>),
  });
  const p = useGlobal(EditorGlobal, "EDITOR");
  let metaOptions: { label: string; value: any }[] = [];

  if (prop.meta?.options || prop.meta?.optionsBuilt) {
    if (!local.loaded) {
      try {
        const args = {
          ...window.exports,
          db: p.script.db,
          api: p.script.api,
        };
        eval(`
${Object.entries(args)
  .map((e) => `const ${e[0]} = args["${e[0]}"]`)
  .join(";\n")}
const resOpt = ${prop.meta.optionsBuilt || prop.meta.options};
if (typeof resOpt === 'function')  local.metaFn = resOpt;
else metaOptions = resOpt;
`);
      } catch (e) {
        console.error(e);
      }
    } else {
      metaOptions = local.loaded;
    }

    if (local.metaFn && !local.loaded && !local.loading) {
      local.loading = true;
      local.metaFn().then((e) => {
        local.loading = false;
        local.loaded = e;
        local.render();
      });
    }
  }

  let evalue: any = null;
  try {
    eval(`evalue = ${prop.value}`);
  } catch (e) {}

  useEffect(() => {
    local.val = evalue;
    local.render();
  }, [evalue]);

  if (
    !local.metaFn &&
    (local.codeEditing ||
      !metaOptions.find((e) => {
        return e.value === evalue;
      }))
  ) {
    return (
      <CPCoded
        editCode={() => {
          local.codeEditing = true;
          local.render();
          editCode(() => {
            local.codeEditing = false;
            local.render();
          });
        }}
        reset={reset}
      />
    );
  }

  let mode = prop.meta?.option_mode;
  if (!mode) mode = "button";

  return (
    <div className="flex items-center flex-wrap space-x-1 justify-end flex-1 min-h-[30px]">
      {local.loading ? (
        <Loading backdrop={false}></Loading>
      ) : (
        <>
          {mode === "dropdown" && (
            <>
              <Downshift
                inputValue={local.val}
                isOpen={local.isOpen}
                onOuterClick={() => {
                  local.isOpen = false;
                  local.render();
                }}
                onInputValueChange={(e) => {
                  local.val = e;
                  local.isOpen = true;
                  local.render();
                }}
                onChange={(sel) => {
                  if (!sel) {
                    local.val = evalue;
                    local.isOpen = false;
                    local.render();
                  } else {
                    const val = JSON.stringify(sel.value);
                    local.isOpen = false;
                    onChange(val);
                  }
                }}
                itemToString={(item) => (item ? item.value : "")}
              >
                {({
                  getInputProps,
                  getItemProps,
                  getLabelProps,
                  getMenuProps,
                  isOpen,
                  inputValue,
                  highlightedIndex,
                  selectedItem,
                  getRootProps,
                }) => (
                  <div className="border-l self-stretch">
                    <div
                      style={{ display: "inline-block" }}
                      {...getRootProps({}, { suppressRefError: true })}
                    >
                      <input
                        {...getInputProps()}
                        onFocus={() => {
                          local.val = "";
                          local.isOpen = true;
                          local.render();
                        }}
                        className="flex-1 self-stretch font-mono border-2 border-transparent outline-none bg-transparent focus:bg-white focus:border-blue-500 border-slate-300 text-[11px] min-h-[30px] pl-1 "
                      />
                    </div>
                    <ul
                      {...getMenuProps()}
                      className="absolute z-10 border right-0 bg-white max-h-[300px] overflow-y-auto"
                    >
                      {isOpen
                        ? metaOptions
                            .filter(
                              (item) =>
                                !inputValue || item.value.includes(inputValue)
                            )
                            .map((item, index) => (
                              <li
                                {...getItemProps({
                                  key: item.value,
                                  index,
                                  item,
                                })}
                                className={cx(
                                  "min-w-[180px] px-2 py-[2px] border-b",
                                  selectedItem === item &&
                                    highlightedIndex !== index &&
                                    `bg-blue-500 text-white`,
                                  highlightedIndex === index && `bg-blue-200`
                                )}
                              >
                                {item.label || item.value}
                              </li>
                            ))
                        : null}
                    </ul>
                  </div>
                )}
              </Downshift>
            </>
          )}
          {mode === "button" && (
            <div className="flex-1 pt-1 px-2 flex flex-wrap justify-end">
              {Array.isArray(metaOptions) &&
                metaOptions.map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      className={cx(
                        "flex px-2 text-xs mb-1 border rounded-sm cursor-pointer  justify-center ",
                        item.value !== evalue
                          ? "bg-white  text-blue-700 hover:bg-blue-50 hover:border-blue-500"
                          : "bg-blue-700 text-white border-blue-700"
                      )}
                      onClick={() => {
                        const val = JSON.stringify(item.value);
                        onChange(val);
                      }}
                    >
                      {item.label}
                    </div>
                  );
                })}
            </div>
          )}
        </>
      )}
    </div>
  );
};
