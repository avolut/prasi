import { apiContext } from "service-srv";

import { Expression, MemberExpression } from "@swc/core";
import { traverse } from "../../../../pkgs/base/src/scaffold/parser/traverse";

type SelectField = { [key: string]: { select?: SelectField } | boolean };
type WhereField = { [key: string]: WhereField | string | undefined };

export type ParsedQuery = {
  type: "query";
  // ctx?: { start: number; end: number };
  table: string;
  select: SelectField;
  where: WhereField;
};

export const _ = {
  url: "/_parsejs",
  async api(js: string) {
    const { req, res } = apiContext(this);

    const parsed: ParsedQuery[] = [];

    if (js.startsWith("db.")) {
      await traverse(js, (parent) => ({
        visitCallExpression(n) {
          if (
            n.callee.type === "MemberExpression" &&
            n.callee.property.type === "Identifier" &&
            n.callee.property.value.startsWith("find") &&
            n.callee.object.type === "MemberExpression" &&
            n.callee.object.property.type === "Identifier" &&
            n.callee.object.object.type === "Identifier" &&
            n.callee.object.object.value === "db" &&
            n.arguments.length === 1 &&
            n.arguments[0].expression.type === "ObjectExpression"
          ) {
            const select: SelectField = {};
            const where: WhereField = {};

            for (const p of n.arguments[0].expression.properties) {
              if (
                p.type === "KeyValueProperty" &&
                p.key.type === "Identifier"
              ) {
                if (p.key.value === "select") {
                  extractField(p.value, select);
                } else if (p.key.value === "where") {
                  extractField(p.value, where);
                }
              }
            }

            parsed.push({
              type: "query",
              // ctx: { start: n.span.start, end: n.span.end },
              table: n.callee.object.property.value,
              select,
              where,
            });
          }
          return parent.visitCallExpression(n);
        },
      }));
    }
    return { status: "ok", parsed };
  },
};

export const extractField = (e: Expression, select: any) => {
  if (e.type === "ObjectExpression") {
    for (const p of e.properties) {
      if (
        p.type === "KeyValueProperty" &&
        (p.key.type === "Identifier" || p.key.type === "StringLiteral")
      ) {
        switch (p.value.type) {
          case "MemberExpression":
            {
              const drillMember = (v: MemberExpression) => {
                let result = ``;
                if (v.object.type === "Identifier") {
                  result += `${v.object.value}.`;
                } else if (v.object.type === "MemberExpression") {
                  result += `${drillMember(v.object)}.`;
                }
                if (v.property.type === "Identifier") {
                  result += v.property.value;
                }
                return result;
              };

              select[p.key.value] = drillMember(p.value);
            }
            break;
          case "BooleanLiteral":
            {
              select[p.key.value] = p.value.value;
            }
            break;
          case "TemplateLiteral":
            {
              select[p.key.value] = `"${p.value.quasis
                .map((e) => e.cooked)
                .join("")}"`;
            }
            break;
          case "ObjectExpression":
            {
              select[p.key.value] = {};
              extractField(p.value, select[p.key.value]);
            }
            break;
          case "ArrayExpression":
            {
              select[p.key.value] = [];
              for (const e of p.value.elements) {
                if (e?.expression.type === "ObjectExpression") {
                  const value = {};
                  extractField(e?.expression, value);
                  select[p.key.value].push(value);
                }
              }
            }
            break;
        }
      }
    }
  }
};
