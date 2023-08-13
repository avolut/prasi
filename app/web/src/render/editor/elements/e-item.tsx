import { FC } from "react";
import { IItem } from "../../../utils/types/item";
import { EComponent } from "./e-component";
import { ERender } from "./e-render";
import { EText } from "./e-text";

export const EItem: FC<{
  item: IItem;
  editComponentId?: string;
  editComponentProps?: any;
}> = ({ item, editComponentId, editComponentProps }) => {
  const compid = item.component?.id;
  if (compid) {
    return (
      <EComponent
        item={item}
        editComponentId={editComponentId}
        editComponentProps={editComponentProps}
      />
    );
  }

  return (
    <>
      <ERender
        item={item}
        editComponentId={editComponentId}
        editComponentProps={editComponentProps}
      >
        {(childs) =>
          childs.map((e) => {
            if (e.type === "item")
              return (
                <EItem
                  item={e}
                  key={e.id}
                  editComponentId={editComponentId}
                  editComponentProps={editComponentProps}
                />
              );
            else
              return (
                <EText
                  item={e}
                  key={e.id}
                  editComponentId={editComponentId}
                  editComponentProps={editComponentProps}
                />
              );
          })
        }
      </ERender>
    </>
  );
};
