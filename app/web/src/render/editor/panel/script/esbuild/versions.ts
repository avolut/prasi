// This file manages the UI for the version picker in the top right corner

const versionsPromise = tryToFetchVersions();
let reloadWorker: (version: string) => Promise<Worker>;

export function setReloadWorkerCallback(
  callback: (version: string) => Promise<Worker>
): void {
  reloadWorker = callback;
}

export async function tryToSetCurrentVersion(version: string): Promise<void> {
  const versions = await versionsPromise;

  const index =
    version === "latest" && versions.length ? 0 : versions.indexOf(version);
  if (index >= 0) {
    await reloadWorker(versions[index]);
  }
}

async function tryToFetchVersions(): Promise<string[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort("Timeout"), 5000);

  // This is probably faster than the registry because it returns less data
  try {
    const url = "https://data.jsdelivr.com/v1/package/npm/esbuild-wasm";
    const response = await fetch(url, { signal: controller.signal });
    if (response && response.ok) {
      clearTimeout(timeout);
      const versions = (await response.json()).versions;

      if (versions && versions.length) {
        return versions;
      }
    }
  } catch (err) {
    console.error(err);
  }

  // Fall back to the npm registry if that service is down
  try {
    const url = "https://registry.npmjs.org/esbuild-wasm";
    let versions = (await fetch(url).then((r) => r.json())).versions;
    if (versions) {
      versions = Object.keys(versions).reverse();
      if (versions.length) {
        return versions;
      }
    }
  } catch (err) {
    console.error(err);
  }

  throw new Error();
}
