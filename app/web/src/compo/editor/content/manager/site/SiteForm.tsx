import { site } from "dbgen";
import { FC } from "react";
import { useGlobal, useLocal } from "web-utils";
import { CEGlobal } from "../../../../../base/global/content-editor";
import { Input } from "../../../../ui/form/input";
import { formStyle } from "../../../../form.style";
import { wsdoc } from "../../../ws/wsdoc";

export const SiteForm: FC<{
  site: Partial<site>;
  onClose: () => void;
  onSave: () => void;
  group_id: string;
}> = ({ site, onClose, onSave, group_id }) => {
  const c = useGlobal(CEGlobal, "PAGE");
  const local = useLocal({ init: false, saving: false });
  const form = useLocal({} as Partial<site>);

  if (!local.init) {
    local.init = true;
    for (const [k, v] of Object.entries(site)) {
      (form as any)[k] = v;
    }
  }

  return (
    <>
      <div
        className="absolute cursor-pointer inset-0 flex items-center justify-center
         backdrop-blur cursor-pointer hover:backdrop-blur-sm transition-all"
        onClick={onClose}
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            if (form.name && wsdoc.session) {
              local.saving = true;
              local.render();
              if (!form.id) {
                try {
                  await db.site.create({
                    data: {
                      name: form.name,
                      colors: {},
                      favicon: "",
                      domain: form.domain || "",
                      id_user: wsdoc.session.data.user.id,
                      id_org: group_id,
                    },
                  });
                } catch (e) {
                  alert(e);
                }
              } else {
                await db.site.update({
                  data: { name: form.name, domain: form.domain },
                  where: { id: form.id },
                });
              }
              onSave();
            }

            local.saving = false;
            local.render();
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
              onBlur={() => {
                if (!form.domain) {
                  form.domain = (form.name || "").replace(/\W/g, "");
                  form.render();
                }
              }}
            />
          </label>
          <label>
            <span>Domain</span>
            <Input
              form={form}
              name={"domain"}
              onChange={(text) => {
                return text.replace(/\W/g, "");
              }}
            />
          </label>

          {form.id && (
            <label>
              <span>Site ID:</span>
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
                  if (confirm("Delete site cannot be undone. Are you sure ?")) {
                    if (
                      prompt(
                        "Please type 'yes' (without quote) to confirm deletion: "
                      )?.toLowerCase() === "yes"
                    ) {
                      await db.site.update({
                        where: {
                          id: site.id,
                        },
                        data: {
                          is_deleted: true,
                        },
                      });
                      onSave();
                    }
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
