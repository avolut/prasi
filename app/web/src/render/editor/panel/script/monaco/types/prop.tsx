import trim from "lodash.trim";
import { isValidElement } from "react";

export const extractProp = (prop: {
  values: Record<string, any>;
  types: Record<string, string>;
}) => {
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

        if (typeof v === "function") {
          if (isFunctionalComponent(v)) {
            props[k].type = "React.FC";
          } else if (isClassComponent(v)) {
            props[k].type = "React.Component";
          } else {
            props[k].type = "any";
          }
        } else {
          if (!!v && !!v.render && typeof v.$$typeof === "symbol") {
            props[k].type = "React.FC<Record<string,any> & {ref?:any}>";
          } else {
            props[k].val = v;
          }
        }
      }
    }
  }

  for (const [k, v] of Object.entries(props)) {
    if (v.type) {
      propTypes.push(`const ${k}: ${trim(v.type, "; \n")};`);
    } else if (v.val) {
      if (typeof v.val === "object" && isValidElement(v.val)) {
        propTypes.push(`const ${k}: ReactElement;`);
      } else {
        try {
          let val = v.val;

          if (typeof val === "object") {
            if (typeof val.render === "function") {
              val = { ...val, render: () => {} };
            }

            propTypes.push(`const ${k}: ${recurseTypes(val)};`);
          } else {
            propTypes.push(`const ${k}: string;`);
          }
        } catch (e) {}
      }
    }
  }

  return propTypes;
};

function recurseTypes(object: any) {
  const result: string[] = [];
  if (typeof object === "object") {
    if (object === null) return "null";
    if (Array.isArray(object)) {
      return `any[]`;
    }

    for (const [k, v] of Object.entries(object)) {
      result.push(
        `${k}: ${typeof v === "object" && v ? recurseTypes(v) : typeof v}`
      );
    }

    return `{
  ${result.join(";\n  ")}
}`;
  }
  return typeof object;
}

function isFunctionalComponent(Component: any) {
  return (
    typeof Component === "function" && // can be various things
    !(
      (
        Component.prototype && // native arrows don't have prototypes
        Component.prototype.isReactComponent
      ) // special property
    )
  );
}

function isClassComponent(Component: any) {
  return !!(
    typeof Component === "function" &&
    Component.prototype &&
    Component.prototype.isReactComponent
  );
}
