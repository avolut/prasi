import trim from "lodash.trim";
import { CEGlobal } from "../../../../base/global/content-editor";
import { MItem } from "../../../types/item";
import { FBuild } from "../script/monaco/monaco-element";

export const detachComp = async (
  c: typeof CEGlobal,
  item: MItem,
  build: FBuild
) => {
  const id = item.get("id");
  if (id) {
    const js = trim(
      (c.instances[id].adv?.js || `<div {...props}>{children}</div>`).trim(),
      ";"
    );

    const js_compiled = await build(
      "element.tsx",
      `render(<PassProp>${js}</PassProp>)`
    );
    console.log(js_compiled);
  }
};
