import { useGlobal } from "web-utils";
import { CEGlobal } from "../../../../../base/global/content-editor";
import { responsiveMode } from "../../../../page/tools/responsive-mode";
import { ToolbarBox } from "../../../../ui/box";
import { wsdoc } from "../../../ws/wsdoc";

export const ResponsiveToggle = () => {
  const c = useGlobal(CEGlobal, "PAGE");
  const mode = responsiveMode();
  const activeModeClassName = "border-b-2 border-blue-500 bg-blue-50";
  return (
    <ToolbarBox
      items={[
        {
          onClick() {
            localStorage.setItem("editor-mode", "mobile");
            wsdoc.mode = "mobile";
            c.render();
          },
          className: cx(mode === "mobile" && activeModeClassName),
          content: (
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
                d="M4 2.5a.5.5 0 01.5-.5h6a.5.5 0 01.5.5v10a.5.5 0 01-.5.5h-6a.5.5 0 01-.5-.5v-10zM4.5 1A1.5 1.5 0 003 2.5v10A1.5 1.5 0 004.5 14h6a1.5 1.5 0 001.5-1.5v-10A1.5 1.5 0 0010.5 1h-6zM6 11.65a.35.35 0 100 .7h3a.35.35 0 100-.7H6z"
                clipRule="evenodd"
              ></path>
            </svg>
          ),
        },
        {
          onClick() {
            localStorage.setItem("editor-mode", "desktop");
            wsdoc.mode = "desktop";
            c.render();
          },
          className: cx(mode === "desktop" && activeModeClassName),
          content: (
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
                d="M1 3.25A.25.25 0 011.25 3h12.5a.25.25 0 01.25.25v7.5a.25.25 0 01-.25.25H1.25a.25.25 0 01-.25-.25v-7.5zM1.25 2C.56 2 0 2.56 0 3.25v7.5C0 11.44.56 12 1.25 12h3.823l-.243 1.299a.55.55 0 00.54.651h4.26a.55.55 0 00.54-.651L9.927 12h3.823c.69 0 1.25-.56 1.25-1.25v-7.5C15 2.56 14.44 2 13.75 2H1.25zm7.76 10H5.99l-.198 1.05h3.416L9.01 12z"
                clipRule="evenodd"
              ></path>
            </svg>
          ),
        },
      ]}
    />
  );
};
