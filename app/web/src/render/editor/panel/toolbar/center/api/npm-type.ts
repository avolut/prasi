import { npm_page, npm_site } from "dbgen";

export type NPMImportAs = {
  main: { mode: "default" | "*"; name: string };
  names: string[];
  custom?: string
};
