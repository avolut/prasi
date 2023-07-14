import type { OnMount } from "@monaco-editor/react";
import { wsdoc } from "../../../ws/wsdoc";
import { baseTypings } from "./types/base";
export type MonacoEditor = Parameters<OnMount>[0];
type Monaco = Parameters<OnMount>[1];

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

  for (const [k, v] of Object.entries(wsdoc.apiDef.prismaTypes)) {
    monaco.editor.createModel(
      `declare module '${k.replace(`\.d\.ts`, "")}' { ${v} } `,
      "typescript",
      monaco.Uri.parse(k)
    );
  }

  monaco.editor.createModel(
    wsdoc.apiDef.apiTypes,
    "typescript",
    monaco.Uri.parse("api.d.ts")
  );

  monaco.editor.createModel(
    `\
import React from 'react';
import prisma from 'prisma';

${iftext(
  wsdoc.apiDef.apiTypes,
  `\
import "./api"
import type * as SRVAPI from "app/gen/srv/api/srv";`
)}


declare global {
  const db: prisma.PrismaClient; 
  
  ${baseTypings}

  ${iftext(
    wsdoc.apiDef.apiTypes,
    `
  type Api = typeof SRVAPI;
  type ApiName = keyof Api;
  const api: { [k in ApiName]: Awaited<Api[k]["handler"]>["_"]["api"] };
  `
  )}

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