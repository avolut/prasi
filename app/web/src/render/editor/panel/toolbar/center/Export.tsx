import { useGlobal } from "web-utils";
import { EditorGlobal } from "../../../logic/global";

export const Export = () => {
  const p = useGlobal(EditorGlobal, "EDITOR");

  return (
    <div className="w-[280px] p-2 text-sm flex flex-col">
      <div className=" flex items-center justify-between">
        <div>Export to React</div>
        <div className="flex space-x-[1px]">
          <a
            href={`${serverurl}/spa-export/${p.site.id}`}
            className="bg-blue-500 hover:bg-blue-300 text-white rounded px-2 cursor-pointer rounded-r-none outline-none"
          >
            Download TSX
          </a>
          <a
            href={`${serverurl}/spa-export/${p.site.id}?open`}
            target="_blank"
            className="bg-blue-500 hover:bg-blue-300 text-white rounded px-2 cursor-pointer rounded-l-none outline-none flex items-center justify-center"
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
                d="M3 2a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1V8.5a.5.5 0 00-1 0V12H3V3h3.5a.5.5 0 000-1H3zm9.854.146a.5.5 0 01.146.351V5.5a.5.5 0 01-1 0V3.707L6.854 8.854a.5.5 0 11-.708-.708L11.293 3H9.5a.5.5 0 010-1h3a.499.499 0 01.354.146z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
