import { useGlobal } from "web-utils";
import { CEGlobal } from "../../../../../../base/global/content-editor";
import { wsdoc } from "../../../../ws/wsdoc";

export const InternalAPI = () => {
  const c = useGlobal(CEGlobal, "PAGE");
  return (
    <div className="flex flex-col flex-1 items-stretch space-y-1">
      <div>{JSON.stringify(wsdoc.site?.config)}</div>
    </div>
  );
};
