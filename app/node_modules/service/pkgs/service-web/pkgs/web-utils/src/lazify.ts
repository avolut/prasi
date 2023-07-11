import { FC, lazy } from "react";

export const lazify = <T extends Promise<Record<string, any>>>(
  im: T,
  name: keyof Awaited<T>
) => {
  return lazy(async () => {
    return {
      default: (await im)[name],
    };
  });
};
