export const initJS = async () => {
  const { tryToSetCurrentVersion } = await import("../esbuild/versions");
  await tryToSetCurrentVersion("latest");
};
