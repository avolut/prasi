import { FC } from "react";
import { IContent, MContent } from "../../../../../utils/types/general";
import { Tooltip } from "../../../../../utils/ui/tooltip";
import { FNAdv } from "../../../../../utils/types/meta-fn";
import { useGlobal } from "web-utils";
import { EditorGlobal, PG } from "../../../logic/global";
import { IItem } from "../../../../../utils/types/item";
import { newMap } from "../../../tools/yjs-tools";
import { fillID } from "../../../tools/fill-id";
import { editComp } from "../../../logic/comp";

export const ETreeItemAction: FC<{
  item: IContent;
  mode: "mobile" | "desktop";
  isComponent: boolean;
  rename: () => void;
}> = ({ item, mode, isComponent, rename }) => {
  const p = useGlobal(EditorGlobal, "EDITOR");

  let link: string;
  if (mode === "mobile") {
    const mobile = item.mobile;
    link = mobile?.linktag?.link || "";
  } else {
    link = item.linktag?.link || "";
  }

  const mitem = p.treeMeta[item.id].item;

  let canDelete = true;
  const rootComponentID = p.comp?.id;
  if (
    isComponent &&
    rootComponentID &&
    rootComponentID === (item as IItem).component?.id
  ) {
    canDelete = false;
  }

  return (
    <div className="flex action pl-3 items-center w-[100px] justify-end">
      {!!link && (
        <Tooltip content="Has Link">
          <svg
            width="10"
            height="10"
            viewBox="0 0 15 15"
            className="mr-[3px] text-blue-600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.51194 3.00541C9.18829 2.54594 10.0435 2.53694 10.6788 2.95419C10.8231 3.04893 10.9771 3.1993 11.389 3.61119C11.8009 4.02307 11.9513 4.17714 12.046 4.32141C12.4633 4.95675 12.4543 5.81192 11.9948 6.48827C11.8899 6.64264 11.7276 6.80811 11.3006 7.23511L10.6819 7.85383C10.4867 8.04909 10.4867 8.36567 10.6819 8.56093C10.8772 8.7562 11.1938 8.7562 11.389 8.56093L12.0077 7.94221L12.0507 7.89929C12.4203 7.52976 12.6568 7.2933 12.822 7.0502C13.4972 6.05623 13.5321 4.76252 12.8819 3.77248C12.7233 3.53102 12.4922 3.30001 12.1408 2.94871L12.0961 2.90408L12.0515 2.85942C11.7002 2.508 11.4692 2.27689 11.2277 2.11832C10.2377 1.46813 8.94398 1.50299 7.95001 2.17822C7.70691 2.34336 7.47044 2.57991 7.1009 2.94955L7.058 2.99247L6.43928 3.61119C6.24401 3.80645 6.24401 4.12303 6.43928 4.31829C6.63454 4.51355 6.95112 4.51355 7.14638 4.31829L7.7651 3.69957C8.1921 3.27257 8.35757 3.11027 8.51194 3.00541ZM4.31796 7.14672C4.51322 6.95146 4.51322 6.63487 4.31796 6.43961C4.12269 6.24435 3.80611 6.24435 3.61085 6.43961L2.99213 7.05833L2.94922 7.10124C2.57957 7.47077 2.34303 7.70724 2.17788 7.95035C1.50265 8.94432 1.4678 10.238 2.11799 11.2281C2.27656 11.4695 2.50766 11.7005 2.8591 12.0518L2.90374 12.0965L2.94837 12.1411C3.29967 12.4925 3.53068 12.7237 3.77214 12.8822C4.76219 13.5324 6.05589 13.4976 7.04986 12.8223C7.29296 12.6572 7.52943 12.4206 7.89896 12.051L7.89897 12.051L7.94188 12.0081L8.5606 11.3894C8.75586 11.1941 8.75586 10.8775 8.5606 10.6823C8.36533 10.487 8.04875 10.487 7.85349 10.6823L7.23477 11.301C6.80777 11.728 6.6423 11.8903 6.48794 11.9951C5.81158 12.4546 4.95642 12.4636 4.32107 12.0464C4.17681 11.9516 4.02274 11.8012 3.61085 11.3894C3.19896 10.9775 3.0486 10.8234 2.95385 10.6791C2.53661 10.0438 2.54561 9.18863 3.00507 8.51227C3.10993 8.35791 3.27224 8.19244 3.69924 7.76544L4.31796 7.14672ZM9.62172 6.08558C9.81698 5.89032 9.81698 5.57373 9.62172 5.37847C9.42646 5.18321 9.10988 5.18321 8.91461 5.37847L5.37908 8.91401C5.18382 9.10927 5.18382 9.42585 5.37908 9.62111C5.57434 9.81637 5.89092 9.81637 6.08619 9.62111L9.62172 6.08558Z"
              fill="currentColor"
            ></path>
          </svg>
        </Tooltip>
      )}

      {!isComponent && (
        <>
          <Adv item={item} p={p} />
        </>
      )}
      {item.hidden === "all" && (
        <Tooltip content="Hidden: All">
          <div
            className="mx-1"
            onClick={(e) => {
              e.stopPropagation();
              const mitem = p.treeMeta[item.id];
              if (mitem && mitem.item) {
                mitem.item.set("hidden", false);
              }
            }}
          >
            <HideAll />
          </div>
        </Tooltip>
      )}
      {item.hidden === "only-editor" && (
        <Tooltip content="Hidden: Only Editor">
          <div
            className="mx-1"
            onClick={(e) => {
              e.stopPropagation();
              const mitem = p.treeMeta[item.id];
              if (mitem && mitem.item) {
                mitem.item.set("hidden", "all");
              }
            }}
          >
            <HideEditor />
          </div>
        </Tooltip>
      )}
      {rootComponentID !== item.id && isComponent && (
        <>
          <Tooltip
            content="Edit Component"
            className="flex items-center border border-slate-500 bg-white rounded-sm text-[10px] px-[2px]"
            onClick={(e) => {
              e.stopPropagation();
              editComp(p, item);
            }}
          >
            <>Edit</>
          </Tooltip>
        </>
      )}
      {canDelete && (
        <Tooltip
          content="Rename"
          className="flex items-center p-1 h-full text-blue-700"
          onClick={rename}
        >
          <Rename />
        </Tooltip>
      )}

      {canDelete && (
        <>
          <Tooltip
            content="Duplicate"
            className="flex items-center p-1 pr-[2px] h-full text-green-700"
            onClick={() => {
              mitem.parent.forEach((e: MContent, idx) => {
                if (e === mitem) {
                  const json = e.toJSON() as IContent;
                  const map = newMap(fillID(json)) as MContent;
                  mitem.parent.insert(idx, [map]);
                }
              });
            }}
          >
            <Copy />
          </Tooltip>
        </>
      )}

      {canDelete && (
        <>
          <Tooltip
            content="Delete"
            className="flex items-center p-1 h-full text-red-700"
            onClick={() => {
              mitem.parent.forEach((e: MContent, idx) => {
                if (e === mitem) {
                  const json = e.toJSON() as IContent;
                  const map = newMap(fillID(json)) as MContent;
                  mitem.parent.delete(idx);
                }
              });
            }}
          >
            <Trash />
          </Tooltip>
        </>
      )}
    </div>
  );
};

const Adv: FC<{
  item: IContent;
  p: PG;
}> = ({ item, p }) => {
  const adv = { ...item.adv } as FNAdv;

  const openEditor = (mode: "css" | "js" | "html") => {
    const mitem = p.treeMeta[item.id]?.item;
    if (mitem) {
      p.item.active = item.id;
      p.script.active = true;
      p.script.type = mode;
      p.render();
    }
  };

  return (
    <>
      {!!adv.css ? (
        <Tooltip content="Has CSS">
          <div
            className="bg-green-700 w-[7px] h-[7px] mr-[3px] hover:bg-green-900"
            onClick={() => {
              openEditor("css");
            }}
          ></div>
        </Tooltip>
      ) : (
        <Tooltip content="Click to add CSS">
          <div className="pre-action flex items-center">
            <div
              className="bg-green-500 w-[7px] h-[7px] mr-[3px] hover:bg-green-800 opacity-50 hover:opacity-100"
              onClick={() => {
                openEditor("css");
              }}
            ></div>
          </div>
        </Tooltip>
      )}

      {!!adv.js && !adv.html ? (
        <Tooltip content="Has JS">
          <div
            className="bg-orange-600 w-[7px] h-[7px] mr-[3px] hover:bg-orange-800"
            onClick={() => {
              openEditor("js");
            }}
          ></div>
        </Tooltip>
      ) : (
        <Tooltip content="Click to add JS">
          <div className="pre-action flex items-center">
            <div
              className=" bg-orange-500 w-[7px] h-[7px] mr-[3px] hover:bg-orange-800 opacity-50 hover:opacity-100 self-center"
              onClick={() => {
                openEditor("js");
              }}
            ></div>
          </div>
        </Tooltip>
      )}

      {!!adv.html && (
        <Tooltip content="Has HTML">
          <div
            className="bg-blue-600 w-[7px] h-[7px] mr-[3px] hover:bg-blue-800"
            onClick={() => {
              openEditor("html");
            }}
          ></div>
        </Tooltip>
      )}
    </>
  );
};

const actionSize = 13;

const Copy = () => (
  <svg
    width={actionSize}
    height={actionSize}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
  </svg>
);

const Trash = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={actionSize}
    height={actionSize}
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
);

const Rename = () => (
  <svg
    width={actionSize}
    height={actionSize}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.5 1C6.22386 1 6 1.22386 6 1.5C6 1.77614 6.22386 2 6.5 2C7.12671 2 7.45718 2.20028 7.65563 2.47812C7.8781 2.78957 8 3.28837 8 4V11C8 11.7116 7.8781 12.2104 7.65563 12.5219C7.45718 12.7997 7.12671 13 6.5 13C6.22386 13 6 13.2239 6 13.5C6 13.7761 6.22386 14 6.5 14C7.37329 14 8.04282 13.7003 8.46937 13.1031C8.47976 13.0886 8.48997 13.0739 8.5 13.0591C8.51003 13.0739 8.52024 13.0886 8.53063 13.1031C8.95718 13.7003 9.62671 14 10.5 14C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13C9.87329 13 9.54282 12.7997 9.34437 12.5219C9.1219 12.2104 9 11.7116 9 11V4C9 3.28837 9.1219 2.78957 9.34437 2.47812C9.54282 2.20028 9.87329 2 10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1C9.62671 1 8.95718 1.29972 8.53063 1.89688C8.52024 1.91143 8.51003 1.92611 8.5 1.9409C8.48997 1.92611 8.47976 1.91143 8.46937 1.89688C8.04282 1.29972 7.37329 1 6.5 1ZM14 5H11V4H14C14.5523 4 15 4.44772 15 5V10C15 10.5523 14.5523 11 14 11H11V10H14V5ZM6 4V5H1L1 10H6V11H1C0.447715 11 0 10.5523 0 10V5C0 4.44772 0.447715 4 1 4H6Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
  </svg>
);

const HideEditor = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.7649 6.07596C14.9991 6.22231 15.0703 6.53079 14.9239 6.76495C14.4849 7.46743 13.9632 8.10645 13.3702 8.66305L14.5712 9.86406C14.7664 10.0593 14.7664 10.3759 14.5712 10.5712C14.3759 10.7664 14.0593 10.7664 13.8641 10.5712L12.6011 9.30817C11.805 9.90283 10.9089 10.3621 9.93375 10.651L10.383 12.3277C10.4544 12.5944 10.2961 12.8685 10.0294 12.94C9.76267 13.0115 9.4885 12.8532 9.41704 12.5865L8.95917 10.8775C8.48743 10.958 8.00036 10.9999 7.50001 10.9999C6.99965 10.9999 6.51257 10.958 6.04082 10.8775L5.58299 12.5864C5.51153 12.8532 5.23737 13.0115 4.97064 12.94C4.7039 12.8686 4.5456 12.5944 4.61706 12.3277L5.06625 10.651C4.09111 10.3621 3.19503 9.90282 2.3989 9.30815L1.1359 10.5712C0.940638 10.7664 0.624058 10.7664 0.428798 10.5712C0.233537 10.3759 0.233537 10.0593 0.428798 9.86405L1.62982 8.66303C1.03682 8.10643 0.515113 7.46742 0.0760677 6.76495C-0.0702867 6.53079 0.000898544 6.22231 0.235065 6.07596C0.469231 5.9296 0.777703 6.00079 0.924058 6.23496C1.40354 7.00213 1.989 7.68057 2.66233 8.2427C2.67315 8.25096 2.6837 8.25972 2.69397 8.26898C4.00897 9.35527 5.65537 9.99991 7.50001 9.99991C10.3078 9.99991 12.6564 8.5063 14.076 6.23495C14.2223 6.00079 14.5308 5.9296 14.7649 6.07596Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
  </svg>
);

const HideAll = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.3536 2.35355C13.5488 2.15829 13.5488 1.84171 13.3536 1.64645C13.1583 1.45118 12.8417 1.45118 12.6464 1.64645L10.6828 3.61012C9.70652 3.21671 8.63759 3 7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C0.902945 9.08812 2.02314 10.1861 3.36061 10.9323L1.64645 12.6464C1.45118 12.8417 1.45118 13.1583 1.64645 13.3536C1.84171 13.5488 2.15829 13.5488 2.35355 13.3536L4.31723 11.3899C5.29348 11.7833 6.36241 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C14.0971 5.9119 12.9769 4.81391 11.6394 4.06771L13.3536 2.35355ZM9.90428 4.38861C9.15332 4.1361 8.34759 4 7.5 4C4.80285 4 2.52952 5.37816 1.09622 7.50001C1.87284 8.6497 2.89609 9.58106 4.09974 10.1931L9.90428 4.38861ZM5.09572 10.6114L10.9003 4.80685C12.1039 5.41894 13.1272 6.35031 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11C6.65241 11 5.84668 10.8639 5.09572 10.6114Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
  </svg>
);
