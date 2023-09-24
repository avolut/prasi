import { FC } from "react";
import { IText } from "../../../utils/types/text";
import { PG } from "../logic/global";
import { LRender } from "./l-render";

export const LText: FC<{
  id: string;
  fromProp?: boolean;
}> = ({ id, fromProp }) => {
  return <LRender id={id} fromProp={fromProp} />;
};

export const LTextInternal: FC<{
  className: any;
  p: PG;
  item: IText;
  _children: any;
}> = ({ className, item, _children }) => {
  return (
    <div
      id={`text-${item.id}`}
      className={cx(
        className,
        css`
          outline: none;
          min-width: 3px !important;
          min-height: 10px !important;
        `
      )}
      dangerouslySetInnerHTML={{ __html: _children || "" }}
    />
  );
};
