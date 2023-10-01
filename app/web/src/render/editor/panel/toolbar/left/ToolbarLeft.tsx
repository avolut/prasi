import { useGlobal } from "web-utils";
import { ToolbarBox } from "../../../../../utils/ui/box";
import { EditorGlobal } from "../../../logic/global";

export const ToolbarLeft = () => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const pageName = p.page?.name || "";
  return (
    <div className={cx("toolbar-left", "flex space-x-2 pl-1")}>
      <ToolbarBox
        items={[
          {
            content: <>Site {p.site.name}</>,
            onClick() {
              p.manager.site = true;
              p.render();
            },
          },
        ]}
        labelMenu={[
          {
            label: "Logout",
            onClick: () => {
              api.logout().then(() => {
                location.href = "/login";
              });
            },
          },
        ]}
        label={
          <>
            <SiteIcon />
          </>
        }
      />
      <ToolbarBox
        items={[
          {
            content: (
              <>
                {pageName.startsWith("layout:") ? (
                  <>
                    <div className="bg-green-700 text-white text-[10px] px-2 mr-1 -ml-2">
                      LAYOUT
                    </div>
                    <div>{pageName.substring(7)}</div>
                  </>
                ) : (
                  `Page ${pageName}`
                )}
              </>
            ),
            onClick() {
              p.manager.page = true;
              p.render();
            },
          },
        ]}
        label={
          <>
            <PageIcon />
          </>
        }
      />
    </div>
  );
};

const PageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    fill="none"
    viewBox="0 0 15 15"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M3 2.5a.5.5 0 01.5-.5h5.586a.5.5 0 01.353.146l2.415 2.415a.5.5 0 01.146.353V12.5a.5.5 0 01-.5.5h-8a.5.5 0 01-.5-.5v-10zM3.5 1A1.5 1.5 0 002 2.5v10A1.5 1.5 0 003.5 14h8a1.5 1.5 0 001.5-1.5V4.914a1.5 1.5 0 00-.44-1.06l-2.414-2.415A1.5 1.5 0 009.086 1H3.5zm1 3a.5.5 0 000 1h3a.5.5 0 000-1h-3zm0 3a.5.5 0 000 1h6a.5.5 0 000-1h-6zm0 3a.5.5 0 000 1h6a.5.5 0 000-1h-6z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const SiteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    fill="none"
    viewBox="0 0 15 15"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M2.5 3a.5.5 0 00-.5.5v6a.5.5 0 00.5.5h10a.5.5 0 00.5-.5v-6a.5.5 0 00-.5-.5h-10zM1 9.5a1.5 1.5 0 001 1.415v.585A1.5 1.5 0 003.5 13h8a1.5 1.5 0 001.5-1.5v-.585A1.5 1.5 0 0014 9.5v-6A1.5 1.5 0 0012.5 2h-10A1.5 1.5 0 001 3.5v6zm11 2V11H3v.5a.5.5 0 00.5.5h8a.5.5 0 00.5-.5zM5.5 6a.5.5 0 000 1h4a.5.5 0 000-1h-4z"
      clipRule="evenodd"
    ></path>
  </svg>
);
