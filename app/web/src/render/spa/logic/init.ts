import { PG } from "./global";
import { PrasiLoader } from "./loader";

const w = window as unknown as {
  basepath: string;
  serverurl: string;
  navigateOverride: (s: string) => string;
  isEditor: boolean;
  isMobile: boolean;
  isDesktop: boolean;
  exports: any;
  params: any;
};

export const initSPA = (p: PG, loader?: PrasiLoader) => {
  console.log(p, loader);
};
