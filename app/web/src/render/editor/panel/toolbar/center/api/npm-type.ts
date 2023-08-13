
export type NPMImportAs = {
  main: { mode: "default" | "*"; name: string };
  names: string[];
  custom?: string
};
