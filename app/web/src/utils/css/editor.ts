import { IContent } from "../types/general";

export const cssEditor = ({
  item,
  hover,
  active,
}: {
  item: IContent;
  hover?: IContent | null;
  active?: IContent | null;
}) => {
  return cx(
    item.id === hover?.id &&
      css`
        & {
          box-shadow: inset 0 0 0px 3px #bae3fd;
          > img {
            opacity: 0.6;
          }
        }
      `,
    item.id === active?.id &&
      css`
        box-shadow: inset 0 0 0px 2px #009cff;
        > img {
          opacity: 0.6;
        }
      `
  );
};
