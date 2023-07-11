import type { OnMount } from "@monaco-editor/react";
import trim from "lodash.trim";
import { typeStringify } from "./type-stringify";
import {
  MonacoJsxSyntaxHighlight,
  getWorker,
} from "monaco-jsx-syntax-highlight-v2";

export type MonacoEditor = Parameters<OnMount>[0];
type Monaco = Parameters<OnMount>[1];
type CompilerOptions = Parameters<
  Parameters<OnMount>[1]["languages"]["typescript"]["typescriptDefaults"]["setCompilerOptions"]
>[0];

export const jsMount = async (
  editor: MonacoEditor,
  monaco: Monaco,
  prop: { values: Record<string, any>; types: Record<string, string> },
  api_url?: string,
  site?: string,
  page?: string
) => {
  const compilerOptions: CompilerOptions = {
    allowJs: true,
    allowSyntheticDefaultImports: true,
    alwaysStrict: true,
    jsx: monaco.languages.typescript.JsxEmit.React,
    jsxFactory: "React.createElement",
    jsxFragmentFactory: "React.Fragment",
    rootDir: "file:///",
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
  };

  const jsxHgController = new MonacoJsxSyntaxHighlight(getWorker(), monaco);

  const { highlighter, dispose } = jsxHgController.highlighterBuilder({
    editor: editor,
  });

  highlighter();
  editor.onDidChangeModelContent(() => {
    highlighter();
  });

  monaco.languages.registerDocumentFormattingEditProvider("typescript", {
    async provideDocumentFormattingEdits(model, options, token) {
      const prettier = await import("prettier/standalone");
      const babylon = await import("prettier/parser-babel");
      const text = prettier.format(model.getValue(), {
        parser: "babel",
        plugins: [babylon],
      });

      return [
        {
          range: model.getFullModelRange(),
          text,
        },
      ];
    },
  });

  monaco.languages.registerCompletionItemProvider("typescript", {
    triggerCharacters: [">"],
    provideCompletionItems: (model, position) => {
      const codePre: string = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      const tag = codePre.match(/.*<(\w+)>$/)?.[1];

      if (!tag) {
        return;
      }

      const word = model.getWordUntilPosition(position);

      return {
        suggestions: [
          {
            label: `</${tag}>`,
            kind: monaco.languages.CompletionItemKind.EnumMember,
            insertText: `$1</${tag}>`,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: {
              startLineNumber: position.lineNumber,
              endLineNumber: position.lineNumber,
              startColumn: word.startColumn,
              endColumn: word.endColumn,
            },
          },
        ],
      };
    },
  });

  await imports(monaco, {
    "file:///node_modules/react/jsx-runtime.d.ts":
      "https://cdn.jsdelivr.net/npm/@types/react@18.2.0/jsx-runtime.d.ts",
    "file:///node_modules/react/index.d.ts":
      "https://cdn.jsdelivr.net/npm/@types/react@18.2.0/index.d.ts",
  });

  const model = {
    global: monaco.Uri.parse("file:///global.d.ts"),
  };

  const modelNames = Object.values(model).map((e) => e.toString());
  monaco.editor.getModels().forEach((e) => {
    const uri = e.uri.toString();
    if (modelNames.includes(uri)) {
      e.dispose();
    }
  });

  let apiCache: Awaited<ReturnType<typeof imports>> = {};
  if (api_url) {
    apiCache = await imports(monaco, {
      "file:///prisma.d.ts": trim(api_url, "/") + "/_prasi/prisma",
      "file:///api.d.ts": trim(api_url, "/") + "/_prasi/api",
    });
  }

  console.log(apiCache);

  const propTypes: string[] = [];
  const props: Record<string, { val?: any; type?: string }> = {};

  if (prop) {
    if (prop.types) {
      for (const [k, v] of Object.entries(prop.types)) {
        if (!props[k]) {
          props[k] = {};
        }
        props[k].type = v;
      }
    }

    if (prop.values) {
      for (const [k, v] of Object.entries(prop.values)) {
        if (!props[k]) {
          props[k] = {};
        }
        props[k].val = v;
      }
    }
  }

  for (const [k, v] of Object.entries(props)) {
    if (v.type) {
      propTypes.push(`const ${k} = null as unknown as ${v.type};`);
    } else if (v.val) {
      propTypes.push(
        `const ${k} = ${JSON.stringify(v.val, typeStringify)
          .replaceAll('"___FFF||', "")
          .replaceAll('||FFF___"', "")};`
      );
    }
  }

  monaco.editor.createModel(
    `\
import * as React from "react";
${
  apiCache["file:///prisma.d.ts"]
    ? `\
import { PrismaClient } from "./prisma";
`
    : ""
}

${
  apiCache["file:///api.d.ts"]
    ? `
import "./api"
import type * as SRVAPI from "app/gen/srv/api/srv";
`
    : ""
}

declare global {
  type FC<T> = React.FC<T>;
  const Fragment = React.Fragment;
  const ReactNode = React.ReactNode;
  const useCallback = React.useCallback;
  const useMemo = React.useMemo;
  const ReactElement = React.ReactElement;
  const isValidElement = React.isValidElement;
  const useEffect = React.useEffect;
  const useState = React.useState;
  const isEditor: boolean;
  const navigate: (url:string) => void;
  const PassProp: FC<Record<string,any> & {children: React.ReactNode}>;
  const Local: FC<{
    children: ReactNode;
    name: string;
    value: Record<string, any>; 
    effect?: (
      local: Record<string, any> & { render: () => void }
    ) => void | (() => void);
    deps?: any[];
  }>;
  const cx = (...classNames: any[]) => string;
  const css = (
    tag: CSSAttribute | TemplateStringsArray | string,
    ...props: Array<string | number | boolean | undefined | null>
  ) => string[];
  const useGlobal: <T extends object>(defaultValue: T, effectOrID?: (() => Promise<void | (() => void)> | void | (() => void)) | string, id?: string) => T & {
    render: () => void;
};

  const useLocal: <T extends object>(data: T, effect?: ((arg: {
    init: boolean;
  }) => Promise<void | (() => void)> | void | (() => void)) | undefined, deps?: any[]) => { [K in keyof T]: T[K] extends Promise<any> ? Awaited<T[K]> | null : T[K]; } & {
      render: () => void;
  };

  const Props: React.FC<any>;
  const children: any;

  const props: Record<string, any>;

  ${propTypes.join("\n")}

  ${site}

  ${page}

  ${
    apiCache["file:///prisma.d.ts"]
      ? `\
type DbDefRels = Record<
  string,
  {
    relation: "Model.BelongsToOneRelation" | "Model.HasManyRelation";
    modelClass: string;
    join: {
      from: string;
      to: string;
    };
  }
>;

type DbDefCols = Record<
  string,
  {
    name: string;
    type: string;
    rel?: "has-many" | "belongs-to";
    pk: boolean;
    nullable: boolean;
  }
>;

const db: PrismaClient & {
  _tables: () => Promise<string[]>;
  _definition: (
    table: string
  ) => Promise<{ db: { name: string }; rels: DbDefRels; columns: DbDefCols }>;
};

    `
      : ""
  }

${
  apiCache["file:///api.d.ts"]
    ? `
type Api = typeof SRVAPI;
type ApiName = keyof Api;
const api: { [k in ApiName]: Awaited<Api[k]["handler"]>["_"]["api"] };
`
    : ""
}
};
`,
    "typescript",
    model.global
  );

  monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
    compilerOptions
  );

  monaco.languages.typescript.javascriptDefaults.setCompilerOptions(
    compilerOptions
  );
};

const imports = async (monaco: Monaco, defs: Record<string, string>) => {
  const result = {} as Record<string, string>;
  for (const [module, url] of Object.entries(defs)) {
    console.log(url);
    const res = await fetch(url);
    const src = await res.text();
    result[module] = src;

    const uri = monaco.Uri.parse(`${module}`);
    const added = monaco.editor
      .getModels()
      .find((e) => e.uri.toString() === uri.toString());

    if (!added && !!src) monaco.editor.createModel(src, "typescript", uri);
  }
  return result;
};
