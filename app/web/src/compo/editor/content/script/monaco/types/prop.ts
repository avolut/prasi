import { typeStringify } from "./type-stringify";

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
        props[k].val = v;
      }
    }
  }

  for (const [k, v] of Object.entries(props)) {
    if (v.type) {
      propTypes.push(`const ${k} = null as unknown as ${v.type};`);
    } else if (v.val) {
      try {
        propTypes.push(
          `const ${k} = ${JSON.stringify(v.val, typeStringify)
            .replaceAll('"___FFF||', "")
            .replaceAll('||FFF___"', "")};`
        );
      } catch (e) {}
    }
  }

  return propTypes;
};
