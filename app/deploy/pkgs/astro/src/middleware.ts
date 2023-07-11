
export const onRequest = async (context: any, next: any) => {
  const g = (typeof globalThis === "object"
    ? globalThis
    : window) as unknown as any;
  g.isSSR = true;
  context.locals.url = context.url.toString();

  return await next();
};
