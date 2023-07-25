import { useLocal } from "web-utils";
import { IContent } from "../../types/general";
import { CCItem, CCText } from "../content-edit/ce-component";

export const createPassChild =
  (arg: { item: IContent; ceid: string }) =>
  ({ name }: { name: string }) => {
    const local = useLocal({ child: null as any });
    if (!local.child) {
      if (arg.item.type !== "text") {
        for (const child of arg.item.childs) {
          if (child.name === name) {
            local.child = child;
          }
        }
      }
    }
    if (local.child) {
      if (local.child.type === "item")
        return (
          <CCItem ceid={arg.ceid} item={{ ...local.child, hidden: false }} />
        );
      else if (local.child.type === "text")
        return (
          <CCText ceid={arg.ceid} item={{ ...local.child, hidden: false }} />
        );
    }
  };
