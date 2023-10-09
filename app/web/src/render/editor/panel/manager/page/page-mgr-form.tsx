import { page } from "dbgen";
import { FC } from "react";
import { useGlobal, useLocal } from "web-utils";
import { EditorGlobal } from "../../../logic/global";
import { formStyle } from "../../../../../utils/ui/form.style";
import { Input } from "../../../../../utils/ui/form/input";

export const PageForm: FC<{
  page: Partial<page>;
  onClose: () => void;
  onSave: (res: any, isNew: boolean) => void;
}> = ({ page, onClose, onSave }) => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const local = useLocal({
    init: false,
    saving: false,
    fillUrl: false,
    preventClose: false,
  });
  const form = useLocal({} as Partial<page>);

  if (!local.init) {
    local.init = true;
    for (const [k, v] of Object.entries(page)) {
      (form as any)[k] = v;
    }
  }

  return (
    <>
      <div
        className="absolute cursor-pointer inset-0 flex items-center justify-center
         backdrop-blur cursor-pointer hover:backdrop-blur-sm transition-all"
        onPointerUp={() => {
          if (!local.preventClose) {
            onClose();
          }
          local.preventClose = false;
          local.render();
        }}
      >
        <form
          onPointerDown={(e) => {
            e.stopPropagation();
            local.preventClose = true;
            local.render();
          }}
          onPointerUp={(e) => {
            e.stopPropagation();
            local.preventClose = false;
            local.render();
          }}
          onSubmit={async (e) => {
            e.preventDefault();
            if (form.name && p.session) {
              if (!form.name.startsWith("layout:")) {
                form.is_default_layout = false;
              }

              local.saving = true;
              local.render();
              let id_folder = form.id_folder;
              if (!id_folder || id_folder === "ROOT") id_folder = null;
              if (!form.id) {
                const res = await db.page.create({
                  data: {
                    content_tree: {
                      childs: [],
                      id: "root",
                      type: "root",
                    },
                    name: form.name,
                    url: form.url || "",
                    id_site: form.id_site || "",
                    id_folder,
                  },
                });
                onSave(res, true);
              } else {
                const res = await db.page.update({
                  data: {
                    name: form.name,
                    url: form.url || "",
                    is_default_layout: form.is_default_layout,
                  },
                  where: { id: form.id },
                });
                if (p.mpage && p.page && p.page.id === form.id) {
                  p.mpage.transact(() => {
                    if (p.mpage) {
                      const page = p.mpage.getMap("map");
                      if (page) {
                        (page as any).set("name", form.name);
                        (page as any).set("url", form.url);
                      }
                      onSave(page.toJSON(), false);
                    }
                  });
                } else {
                  onSave(res, false);
                }
              }

              local.saving = false;
              local.render();
            }
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={cx(formStyle, "bg-white shadow-2xl border")}
        >
          <label>
            <span>Name</span>
            <Input
              form={form}
              autoFocus
              name={"name"}
              onFocus={() => {
                if (!form.url) {
                  local.fillUrl = true;
                  local.render();
                }
              }}
              onChange={(e) => {
                if (local.fillUrl) {
                  form.url = `/${e.replace(/\W/g, "/").replace(/\/\/+/g, "/")}`;
                }
                form.render();
              }}
              onBlur={() => {
                local.fillUrl = false;
                local.render();
              }}
            />
          </label>
          {form.name?.startsWith("layout:") ? (
            <label>
              <span>Default Layout</span>
              <div className="flex space-x-2">
                <div
                  className={cx(
                    "border-[3px] px-4 cursor-pointer select-none border-black",
                    form.is_default_layout && "bg-black text-white "
                  )}
                  onClick={() => {
                    form.is_default_layout = true;
                    form.render();
                  }}
                >
                  YES
                </div>
                <div
                  className={cx(
                    "border-[3px] px-2 cursor-pointer select-none border-black",
                    !form.is_default_layout && "bg-black text-white"
                  )}
                  onClick={() => {
                    form.is_default_layout = false;
                    form.render();
                  }}
                >
                  NO
                </div>
              </div>
            </label>
          ) : (
            <label>
              <span>url</span>
              <Input form={form} name={"url"} />
            </label>
          )}

          {form.id && (
            <label>
              <span>Page ID:</span>
              <Input form={form} name="id" disabled />
            </label>
          )}

          <div className="flex">
            <button type="submit" disabled={local.saving} className="flex-1">
              {local.saving ? "Saving..." : "Save"}
            </button>
            {form.id && (
              <button
                className="bg-red-600 w-[40px] flex justify-center items-center"
                onClick={async () => {
                  if (confirm("Are you sure ?")) {
                    const res = await db.page.update({
                      where: {
                        id: page.id,
                      },
                      data: {
                        is_deleted: true,
                      },
                    });
                    onSave(res, false);
                  }
                }}
              >
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
                    d="M5.5 1a.5.5 0 000 1h4a.5.5 0 000-1h-4zM3 3.5a.5.5 0 01.5-.5h8a.5.5 0 010 1H11v8a1 1 0 01-1 1H5a1 1 0 01-1-1V4h-.5a.5.5 0 01-.5-.5zM5 4h5v8H5V4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

const slugify = (...args: string[]): string => {
  const value = args.join(" ");

  return value
    .normalize("NFD") // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, "") // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "") // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, "/"); // separator
};
