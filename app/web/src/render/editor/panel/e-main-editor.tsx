import { EPage } from "../elements/e-page";
import { Toolbar } from "./toolbar/Toolbar";

export const EMainEditor = () => {
  return (
    <div className="flex-1 flex flex-col">
      <Toolbar />
      <EPage gid="EDITOR" />
    </div>
  );
};
