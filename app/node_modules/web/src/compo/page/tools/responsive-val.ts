export const responsiveVal = <T>(
  item: any,
  key: string,
  mode: "desktop" | "mobile" | undefined,
  defaultVal: T
): T => {
  let value = item[key];

  if (mode === "desktop" || !mode) {
    if (!value && item.mobile && item.mobile[key]) {
      value = item.mobile[key];
    }
  } else {
    if (item.mobile && item.mobile[key]) {
      value = item.mobile[key];
    }
  }

  if (!value) {
    value = defaultVal;
  }
  return value as T;
};
