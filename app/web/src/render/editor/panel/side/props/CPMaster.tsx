import { FC, useEffect } from "react";
import { MItem } from "../../../../../utils/types/item";
import { useGlobal, useLocal } from "web-utils";
import { EditorGlobal } from "../../../logic/global";

export const CPMaster: FC<{ mitem: MItem }> = ({ mitem }) => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const local = useLocal({ id: mitem.get("id"), ready: false });

  useEffect(() => {
    if (local.id !== mitem.get("id")) {
      p.compProp.edit = false;
      p.render();
    }
  }, [mitem]);

  return (
    <div className="flex flex-col flex-1">
      <div className="border-b py-1 bg-white flex justify-between items-center">
        <div
          className="text-[11px] cursor-pointer select-none text-slate-400 pl-1 flex items-center"
          onClick={() => {
            p.compProp.edit = false;
            p.render();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="11"
            viewBox="0 0 32 32"
          >
            <path
              fill="currentColor"
              d="M10 16L20 6l1.4 1.4-8.6 8.6 8.6 8.6L20 26z"
            ></path>
          </svg>
          <div>Back</div>
        </div>
        <PreviewItemProp />
      </div>
      <div className="flex-1 relative overflow-y-auto">
        <div className="absolute flex-col inset-0"></div>
      </div>
    </div>
  );
};

export const PreviewItemProp = () => {
  const p = useGlobal(EditorGlobal, "EDITOR");

  return (
    <div
      className="flex text-xs space-x-1 mr-1 cursor-pointer hover:text-blue-500 items-center"
      onClick={() => {
        for (const k of Object.keys(p.itemProps)) {
          delete p.itemProps[k];
        }
        p.compProp.preview = !p.compProp.preview;
        p.render();
      }}
    >
      <div>Preview Prop</div>
      <div>
        {!p.compProp.preview ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M8 7a5 5 0 000 10h8a5 5 0 000-10H8zm0-2h8a7 7 0 110 14H8A7 7 0 118 5zm0 10a3 3 0 110-6 3 3 0 010 6z"
            ></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M8 5h8a7 7 0 110 14H8A7 7 0 118 5zm8 10a3 3 0 100-6 3 3 0 000 6z"
            ></path>
          </svg>
        )}
      </div>
    </div>
  );
};
