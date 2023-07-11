import {
  FC,
  TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { responsiveVal } from "../../../../page/tools/responsive-val";
import { IItem } from "../../../../types/item";
import { FNLinkTag } from "../../../../types/meta-fn";
import { ISection } from "../../../../types/section";
import { IText } from "../../../../types/text";
import { Popover } from "../../../../ui/popover";

type LinkTagUpdate = {
  linktag: FNLinkTag;
};

export const PanelLink: FC<{
  value: ISection | IItem | IText;
  mode: "desktop" | "mobile";
  update: <T extends keyof LinkTagUpdate>(
    key: T,
    val: LinkTagUpdate[T]
  ) => void;
}> = ({ value, update, mode }) => {
  const linktag = responsiveVal<FNLinkTag>(value, "linktag", mode, {});

  return (
    <>
      <Popover
        autoFocus={false}
        className="flex"
        content={<div className="p-2">Hello world</div>}
      >
        <AutoHeightTextarea
          spellCheck={false}
          className={cx("flex-1 border border-slate-300 p-1")}
          value={linktag.link || ""}
          placeholder="Link Href"
          onChange={(e) => {
            e.stopPropagation();
            update("linktag", { ...linktag, link: e.currentTarget.value });
          }}
        />
      </Popover>
    </>
  );
};

export function AutoHeightTextarea({
  minRows = 1,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { minRows?: number }) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const calculateAndSetHeight = useCallback(() => {
    if (!ref.current) {
      return;
    }
    const {
      borderBottomWidth,
      borderTopWidth,
      boxSizing,
      lineHeight,
      paddingBottom,
      paddingTop,
    } = window.getComputedStyle(ref.current);
    ref.current.style.height = lineHeight; // set height temporarily to a single row to obtain scrollHeight, disregarding empty space after text (otherwise, scrollHeight would be equal to the height of the element) - this solves auto-shrinking of the textarea (it's not needed for auto-growing it)
    const { scrollHeight } = ref.current; // scrollHeight = content height + padding top + padding bottom

    if (boxSizing === "border-box") {
      const minHeight =
        parseFloat(lineHeight) * minRows +
        parseFloat(paddingTop) +
        parseFloat(paddingBottom) +
        parseFloat(borderTopWidth) +
        parseFloat(borderBottomWidth);
      const allTextHeight =
        scrollHeight +
        parseFloat(borderTopWidth) +
        parseFloat(borderBottomWidth);
      ref.current.style.height = `${Math.max(minHeight, allTextHeight)}px`;
    } else if (boxSizing === "content-box") {
      const minHeight = parseFloat(lineHeight) * minRows;
      const allTextHeight =
        scrollHeight - parseFloat(paddingTop) - parseFloat(paddingBottom);
      ref.current.style.height = `${Math.max(minHeight, allTextHeight)}px`;
    } else {
      console.error("Unknown box-sizing value.");
    }
  }, [minRows]);

  useEffect(() => {
    calculateAndSetHeight();
  }, [calculateAndSetHeight]);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    calculateAndSetHeight();
    if (props.onChange) {
      props.onChange(e);
    }
  };
  calculateAndSetHeight();

  return <textarea {...props} onChange={handleChange} ref={ref} />;
}
