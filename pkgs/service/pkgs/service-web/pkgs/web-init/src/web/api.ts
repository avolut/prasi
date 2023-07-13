import { fetchSendApi } from "./iframe-cors";

export const apiClient = (
  api: Record<string, { url: string; args: any[] }>,
  apiURL?: string
) => {
  return new Proxy(
    {},
    {
      get: (_, actionName: string) => {
        return (...rest: any) => {
          return new Promise<any>(async (resolve) => {
            if (!api || !api[actionName]) {
              resolve(null);
              console.error(`API ${actionName.toString()} not found;`);
              return;
            }

            let actionUrl = api[actionName].url;
            const actionParams = api[actionName].args;
            if (actionUrl && actionParams) {
              if (rest.length > 0 && actionParams.length > 0) {
                for (const [idx, p] of Object.entries(rest)) {
                  const paramName = actionParams[parseInt(idx)];
                  if (actionParams && actionParams.includes(paramName)) {
                    if (!!p && typeof p !== "string" && typeof p !== "number") {
                      continue;
                    }
                  }
                  actionUrl = actionUrl.replace(`:${paramName}?`, p + "");
                  actionUrl = actionUrl.replace(`:${paramName}`, p + "");
                }
              }

              let basePath = basepath === "/" ? "" : basepath;

              const url = `${apiURL || basePath}${actionUrl}`;
              const result = await fetchSendApi(url, rest);
              resolve(result);
            } else {
              console.error(`API Not Found: ${actionName.toString()}`);
            }
          });
        };
      },
    }
  );
};
