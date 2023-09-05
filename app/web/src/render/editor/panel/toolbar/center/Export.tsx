import { useGlobal } from "web-utils";
import { EditorGlobal } from "../../../logic/global";

export const Export = () => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const code = `\
import Prasi from "./Prasi"

export default () => {
  return <Prasi 
    pageId={"${p.page?.id}"}
  />;
}`;
  return (
    <div className="w-[450px] p-2 text-sm flex flex-col">
      <div className=" flex items-center justify-between">
        <div>Export to React</div>
        <div className="flex space-x-[1px] items-stretch h-[20px]">
          <a
            href={`${serverurl}/spa-export/${p.site.id}`}
            className="bg-blue-500 hover:bg-blue-300 text-white rounded px-2 cursor-pointer rounded-r-none outline-none text-xs flex items-center space-x-1"
          >
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
                d="M7.5 1.05a.45.45 0 01.45.45v6.914l2.232-2.232a.45.45 0 11.636.636l-3 3a.45.45 0 01-.636 0l-3-3a.45.45 0 11.636-.636L7.05 8.414V1.5a.45.45 0 01.45-.45zM2.5 10a.5.5 0 01.5.5V12c0 .554.446 1 .996 1h7.005A.999.999 0 0012 12v-1.5a.5.5 0 011 0V12c0 1.104-.894 2-1.999 2H3.996A1.997 1.997 0 012 12v-1.5a.5.5 0 01.5-.5z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>Prasi.tsx</span>
          </a>
          <a
            href={`${serverurl}/spa-export/${p.site.id}?open`}
            target="_blank"
            className="bg-blue-500 hover:bg-blue-300 text-white rounded px-2 cursor-pointer rounded-l-none outline-none flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
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
      <div className="flex flex-col items-stretch pt-2 space-y-1 border-t mt-2">
        <div className="flex justify-between text-xs">
          <div>Usage</div>
          <div
            className="bg-slate-400 text-white px-2 rounded flex items-center rounded space-x-1 cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(code);
              alert("Copied!");
            }}
          >
            <div>Copy</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="11"
              fill="none"
              viewBox="0 0 15 15"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M1 9.5A1.5 1.5 0 002.5 11H4v-1H2.5a.5.5 0 01-.5-.5v-7a.5.5 0 01.5-.5h7a.5.5 0 01.5.5V4H5.5A1.5 1.5 0 004 5.5v7A1.5 1.5 0 005.5 14h7a1.5 1.5 0 001.5-1.5v-7A1.5 1.5 0 0012.5 4H11V2.5A1.5 1.5 0 009.5 1h-7A1.5 1.5 0 001 2.5v7zm4-4a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v7a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-7z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
        <div className="bg-slate-100 font-mono text-[11px] whitespace-pre-wrap p-2 rounded">
          {code}
        </div>
      </div>
    </div>
  );
};
