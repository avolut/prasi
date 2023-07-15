import { useGlobal } from "web-utils";
import { CEGlobal } from "../../../../../../base/global/content-editor";
import { AutoHeightTextarea } from "../../../side/panel/link";

export const InternalAPI = () => {
  const c = useGlobal(CEGlobal, "PAGE");
  return (
    <div className="flex flex-col self-stretch flex-1 items-stretch space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <div className="space-x-1 flex items-center">
            <span className="text-green-700 text-[6px]">●</span>
            <span>Running</span>
          </div>
          <a
            href="/"
            target="_blank"
            className="text-blue-500 hover:underline border px-1"
          >
            prasi.app:21100
          </a>
        </div>
        <div className="flex space-x-1">
          <div className="border border-slate-500 hover:bg-red-100 hover:border-red-500 px-2 rounded cursor-pointer">
            Stop
          </div>

          <div className="border border-slate-500 hover:bg-purple-100 hover:border-purple-500 px-2 rounded cursor-pointer">
            Restart
          </div>
        </div>
      </div>
      <div className="flex flex-col border-t space-y-2 -mx-2 px-2 pt-2">
        <AutoHeightTextarea placeholder="DATABASE_URL" className="p-2 border" />

        <div className="flex justify-between">
          <div className="flex space-x-1 items-center">
            <div className="border border-slate-500 hover:bg-purple-100 hover:border-purple-500 px-2 rounded cursor-pointer">
              DB Pull
            </div>

            <div className="border border-slate-500 hover:bg-purple-100 hover:border-purple-500 px-2 rounded cursor-pointer">
              Generate
            </div>
          </div>
          <div className="border border-slate-500 hover:bg-red-100 hover:border-red-500 px-2 rounded cursor-pointer">
            Destroy
          </div>
        </div>
      </div>
    </div>
  );
};
