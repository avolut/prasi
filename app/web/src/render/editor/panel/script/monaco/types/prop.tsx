import { forwardRef, isValidElement } from "react";
import { typeStringify } from "./type-stringify";

const A = forwardRef((prop: { a: "string" }, ref) => {
  return <div></div>;
});

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
      propTypes.push(`const ${k} = null as unknown as ${v.type};`);
    } else if (v.val) {
      if (typeof v.val === "object" && isValidElement(v.val)) {
        propTypes.push(`const ${k}: ReactElement;`);
      } else {
        try {
          propTypes.push(
            `const ${k} = ${JSON.stringify(v.val, typeStringify)
              .replaceAll('"___FFF||', "")
              .replaceAll('||FFF___"', "")};`
          );
        } catch (e) {}
      }
    }
  }

  return propTypes;
};

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