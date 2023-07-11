export const waitUntil = (
  condition: number | (() => any),
  timeout?: number
) => {
  return new Promise<void>(async (resolve) => {
    if (typeof condition === "function") {
      let tout = null as any;
      if (timeout) {
        tout = setTimeout(resolve, timeout);
      }
      if (await condition()) {
        clearTimeout(tout);
        resolve();
        return;
      }
      let count = 0;
      const c = setInterval(async () => {
        if (await condition()) {
          if (tout) clearTimeout(tout);
          clearInterval(c);
          resolve();
        }
        if (count > 100) {
          clearInterval(c);
        }
      }, 10);
    } else if (typeof condition === "number") {
      setTimeout(() => {
        resolve();
      }, condition);
    }
  });
};
