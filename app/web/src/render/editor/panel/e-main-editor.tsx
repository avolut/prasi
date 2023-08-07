import { EPage } from "../elements/e-page";
import { editorStyle } from "../elements/style";
import { Toolbar } from "./toolbar/Toolbar";

export const EMainEditor = () => {
  return (
    <div
      className={cx("editor flex-1 flex flex-col items-stretch", editorStyle)}
    >
      <Toolbar />
      <EPage />
    </div>
  );
};
