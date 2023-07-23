import { FC } from "react";
import { useGlobal } from "web-utils";
import { CEGlobal } from "../../../../base/global/content-editor";
import { jscript } from "./script-element";
import { Loading } from "../../../ui/loading";
import { ScriptMonacoCustom } from "./monaco/monaco-custom";

export const ScriptCustom: FC<{
  id: string;
  item_id?: string;
  props?: Record<string, any>;
  propTypes?: Record<string, string>;
  wrap?: (src: string) => string;
  src: string;
  onChange: (src: string, built: string) => void;
}> = ({ id, src, onChange, item_id, props, propTypes, wrap }) => {
  const c = useGlobal(CEGlobal, id);

  if (!jscript.editor) {
    Promise.all([
      import("@monaco-editor/react").then((e) => {
        jscript.editor = e.Editor;
        e.loader.config({ paths: { vs: "/min/vs" } });
      }),
      jscript.init(),
    ]).then(() => {
      c.render();
    });
  }

  return (
    <div
      className={cx(
        "flex flex-1",
        css`
          .monaco-editor {
            .mtk9 {
              color: #022f62;
            }
            .mtk1 {
              color: #022f62;
            }
            .mtk22 {
              color: #015cc5;
            }
            .mtk8 {
              color: #015cc5;
            }
            .mtk5 {
              color: #55bb8a;
            }
            .monaco-editor.showUnused .squiggly-inline-unnecessary {
              opacity: 0.4;
            }
            .jsx-expression-braces {
              color: #7c3813;
            }
            .jsx-tag-angle-bracket {
              color: #619ac3;
            }
            .jsx-tag-name {
              color: #619ac3;
            }
            .jsx-tag-order-1 {
              color: #23863a;
            }
            .jsx-tag-order-2 {
              color: #4e7ca1;
            }
            .jsx-tag-order-3 {
              color: #020360;
            }
            .jsx-tag-attribute-key {
              color: #6f42c1;
            }
            .jsx-text {
              color: #000000;
            }
          }
        `
      )}
    >
      {!jscript.editor || !jscript.build ? (
        <Loading backdrop={false} />
      ) : (
        <ScriptMonacoCustom
          id={id}
          Editor={jscript.editor}
          build={jscript.build}
          src={src}
          onChange={onChange}
          props={props}
          propTypes={propTypes}
          wrap={wrap}
          item_id={item_id}
        />
      )}
    </div>
  );
};
