export const typeStringify = function (this: any, key: string, value: any) {
  if (typeof value === "function") {
    return `___FFF||any||FFF___`;
  }
  return value;
};

export const typeReviver = (key: any, value: any) => {
  if (typeof key === "string" && key.indexOf("function ") === 0) {
    let functionTemplate = `(${value})`;
    return eval(functionTemplate);
  }
  return value;
};
