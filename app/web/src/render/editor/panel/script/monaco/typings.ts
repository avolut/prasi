import type { OnMount } from "@monaco-editor/react";
import { baseTypings } from "./types/base";
import { extractProp } from "./types/prop";
export type MonacoEditor = Parameters<OnMount>[0];
type Monaco = Parameters<OnMount>[1];

export const monacoTypings = async (
  editor: MonacoEditor,
  monaco: Monaco,
  prop: { values: Record<string, any>; types: Record<string, string> }
) => {
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

  // for (const [k, v] of Object.entries(wsdoc.apiDef.prismaTypes)) {
  //   register(
  //     monaco,
  //     `declare module '${k.replace(`\.d\.ts`, "")}' { ${v} } `,
  //     `ts:${k}`
  //   );
  // }

  // register(monaco, wsdoc.apiDef.apiTypes, "ts:api.d.ts");

  const propText = extractProp(prop);

  register(
    monaco,
    `\
import React from 'react';
import prisma from 'prisma';


declare global {
  const db: prisma.PrismaClient; 
  
  ${baseTypings}

  ${propText.join("\n")}
}

  `,
    "ts:global.d.ts"
  );
};

const loadText = async (url: string) => {
  const res = await fetch(url);
  return await res.text();
};

export const iftext = (condition: any, text: string) => {
  if (condition) {
    return text;
  }
  return "";
};

export const register = (monaco: Monaco, source: string, uri: string) => {
  const model = monaco.editor.getModels().find((e) => {
    return e.uri.toString() === uri;
  });
  if (model) {
    model.dispose();
  }
  monaco.editor.createModel(source, "typescript", monaco.Uri.parse(uri));
};