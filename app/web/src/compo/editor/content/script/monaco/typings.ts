import type { OnMount } from "@monaco-editor/react";
import { baseTypings } from "./types/base";
import { wsdoc } from "../../../ws/wsdoc";
export type MonacoEditor = Parameters<OnMount>[0];
type Monaco = Parameters<OnMount>[1];
type CompilerOptions = Parameters<
  Parameters<OnMount>[1]["languages"]["typescript"]["typescriptDefaults"]["setCompilerOptions"]
>[0];

export const monacoTypings = async (editor: MonacoEditor, monaco: Monaco) => {
  monaco.languages.typescript.typescriptDefaults.setExtraLibs([
    {
      filePath: "react.d.ts",
      content: await loadText(
        "https://cdn.jsdelivr.net/npm/@types/react@18.2.0/index.d.ts"
      ),
    },
    {
      filePath: "jsx-runtime.d.ts",
      content: await loadText(
        "https://cdn.jsdelivr.net/npm/@types/react@18.2.0/jsx-runtime.d.ts"
      ),
    },
  ]);

  monaco.editor.createModel(
    wsdoc.apiDef.apiTypes,
    "typescript",
    monaco.Uri.parse("api.d.ts")
  );

  monaco.editor.createModel(
    `\
import React from 'react';

${iftext(
  wsdoc.apiDef.apiTypes,
  `\
import "./api"
import type * as SRVAPI from "app/gen/srv/api/srv";`
)}

declare global {
  
  ${baseTypings}

  type Api = typeof SRVAPI;
  type ApiName = keyof Api;
  const api: { [k in ApiName]: Awaited<Api[k]["handler"]>["_"]["api"] };
}

  `,
    "typescript",
    monaco.Uri.parse("global.d.ts")
  );
};

const loadText = async (url: string) => {
  const res = await fetch(url);
  return await res.text();
};

const iftext = (condition: any, text: string) => {
  if (condition) {
    return text;
  }
  return "";
};
