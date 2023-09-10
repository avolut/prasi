import type { OnMount } from "@monaco-editor/react";
import { w } from "../../../../../utils/types/general";
import { PG } from "../../../logic/global";
import { baseTypings } from "./types/base";
import { extractProp } from "./types/prop";
export type MonacoEditor = Parameters<OnMount>[0];
type Monaco = Parameters<OnMount>[1];

const map = new WeakMap<any>();

export const monacoTypings = async (
  p: PG,
  monaco: Monaco,
  prop: { values: Record<string, any>; types: Record<string, string> }
) => {
  if (!map.has(prop.values)) {
    map.set(prop.values, true);
  } else {
    return;
  }

  if (w.prasiApi[p.site.api_url]) {
    for (const [k, v] of Object.entries(
      w.prasiApi[p.site.api_url].prismaTypes
    )) {
      register(
        monaco,
        `declare module '${k === "prisma.d.ts" ? "" : "ts:"}${k.replace(
          `\.d\.ts`,
          ""
        )}' { ${v} } `,
        `ts:${k}`
      );
    }
    register(monaco, w.prasiApi[p.site.api_url].apiTypes, "ts:api.d.ts");
  }

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
    {
      filePath: "site.d.ts",
      content: p.site_dts.replaceAll("export declare const", "declare const"),
    },
  ]);

  const propText = extractProp(prop);

  const apiTypes = w.prasiApi[p.site.api_url]
    ? w.prasiApi[p.site.api_url].apiTypes
    : "";

  let apiPath = "app/gen/srv/api/srv";
  if (apiTypes.includes(`export * as srv from "gen/srv/api/srv"`)) {
    apiPath = "gen/srv/api/srv";
  }

  register(
    monaco,
    `\
import React from 'react';
import prisma from 'prisma';

${iftext(
  apiTypes,
  `\
import "./api"
import type * as SRVAPI from "${apiPath}";`
)}

declare global {
  const db: prisma.PrismaClient; 
  
  ${baseTypings}

  const moko: {nama: string};
  ${propText.join("\n")}

  ${iftext(
    apiTypes,
    `
  type Api = typeof SRVAPI;
  type ApiName = keyof Api;
  const api: { [k in ApiName]: Awaited<Api[k]["handler"]>["_"]["api"] };
  `
  )}
}

  `,
    "ts:global.d.ts"
  );
};

const loadText = async (url: string) => {
  try {
    const res = await fetch(url);
    return await res.text();
  } catch (e) {
    return "";
  }
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
    model.setValue(source);
  } else {
    monaco.editor.createModel(source, "typescript", monaco.Uri.parse(uri));
  }
};
