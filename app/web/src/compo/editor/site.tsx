import { site } from "dbgen";
import { FC, useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { CEGlobal } from "../../base/global/content-editor";
import { MPage, w } from "../types/general";
import { PageEditor } from "./page";
import { editorStyle } from "./style";
import { connectWS } from "./ws/ws";
import { wsdoc } from "./ws/wsdoc";

export const SiteEditor: FC<{
  site: site;
  page_id?: string;
}> = ({ site, page_id }) => {
  const ce = useGlobal(CEGlobal, "PAGE");
  const local = useLocal({
    page: null as MPage | null,
    init: false,
    loading: false,
  });

  wsdoc.site = site as any;
  wsdoc.mode = (localStorage.getItem("editor-mode") || "desktop") as any;
  w.isEditor = true;
  if (!w.prasiApi) w.prasiApi = {};

  useEffect(() => {
    const keyDown = async (evt: KeyboardEvent) => {
      if (
        (evt.key === "s" || evt.key === "s") &&
        (evt.ctrlKey || evt.metaKey)
      ) {
        evt.preventDefault();
        evt.stopPropagation();
      }
    };
    window.addEventListener("keydown", keyDown, true);
    return () => {
      window.removeEventListener("keydown", keyDown, true);
    };
  }, []);

  if (local.init && local.page) {
    if (local.page.getMap("map").get("id") !== page_id) {
      local.page = null;
      local.loading = true;
    }
  }

  if (!local.init) {
    if (page_id && page_id.length > 4) {
      wsdoc.page_id = page_id;
      connectWS({
        id: page_id,
        ce: ce,
        connected(page) {
          local.init = true;
          local.page = page;
          local.loading = false;
          local.render();
        },
      });
    } else {
      db.page
        .findFirst({
          where: {
            id_site: site.id,
            is_deleted: false,
          },
          select: { id: true },
        })
        .then((page) => {
          if (page) {
            navigate(`/editor/${site.id}/${page.id}`);
          } else {
            local.init = false;
            local.loading = false;
            local.render();
          }
        });
    }

    local.loading = true;
  } else {
    if (page_id && page_id.length > 4) {
      if (wsdoc.page_id !== page_id) {
        wsdoc.page_id = page_id;
        wsdoc.retry.disabled = true;
        (ce as any).doc = null;

        connectWS({
          id: page_id,
          ce: ce,
          connected(page) {
            local.init = true;
            local.loading = false;
            local.page = page;
            local.render();
          },
        });
        local.loading = true;
      }
    }
  }

  if (!local.page && !local.loading) {
    return (
      <div className="flex-1 flex justify-center items-center">
        Page Not Found
      </div>
    );
  }

  return (
    <div
      className={cx("editor flex flex-1 flex-col items-stretch", editorStyle)}
    >
      <PageEditor
        page={local.page}
        global={{ css: site.css, api_url: (site.config as any)?.api_url }}
      />
    </div>
  );
};
