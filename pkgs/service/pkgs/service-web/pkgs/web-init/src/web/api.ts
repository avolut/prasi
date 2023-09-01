import { fetchSendApi } from "./iframe-cors";

export const apiClient = (
  api: Record<string, { url: string; args: any[] }>,
  apiUrl?: string
) => {
  return new Proxy(
    {},
    {
      get: (_, actionName: string) => {
        return function (this: { apiUrl: string } | undefined, ...rest: any) {
          return new Promise<any>(async (resolve) => {
            let _apiURL = apiUrl;
            if (this?.apiUrl) {
              _apiURL = this.apiUrl;
            }

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

              const url = `${_apiURL || basePath}${actionUrl}`;
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
