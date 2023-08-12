import { FNAdv } from "../../types/meta-fn";

export const renderHTML = (className: string[], adv: FNAdv, props: any) => {
  if (adv.html) {
    return (
      <div
        {...props}
        className={cx(className)}
        dangerouslySetInnerHTML={{ __html: adv.html }}
      ></div>
    );
  }
  return null;
};
