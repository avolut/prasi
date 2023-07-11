import { appendFile } from "fs/promises";
import { dirname, join } from "path";
import { apiContext, generateUploadPath, UploadedFile } from "service-srv";
import { dirAsync } from "fs-jetpack";
import mime from "mime-types";
export const _ = {
  url: "/_upload",
  async api() {
    const { req, res } = apiContext(this);
    const result: string[] = [];
    if (req.body) {
      const path = join(process.cwd(), "..", "content", "upload");
      if (Array.isArray(req.body)) {
        await dirAsync(path);
        for (const f of req.body) {
          if (f.data) {
            const file = f as UploadedFile;
            const upath = generateUploadPath(file, path);
            await dirAsync(dirname(upath.path));
            await appendFile(upath.path, Buffer.from(f.data));
            result.push([upath.url].join("/"));
          }
        }
      } else if (req.body instanceof Buffer) {
        const ext = mime.extension(req.headers["content-type"]);
        const filename = "file";
        const _data = toArrayBuffer(req.body);
        const file: UploadedFile = {
          data: _data,
          filename: `${filename}.${ext}`,
          name: filename,
          type: req.headers["content-type"],
        };
        await dirAsync(path);
        const upath = generateUploadPath(file, path);
        await dirAsync(dirname(upath.path));
        await appendFile(upath.path, Buffer.from(_data));
        result.push([upath.url].join("/"));
      }
    }
    return result;
  },
};
function toArrayBuffer(buffer: Buffer) {
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  );
}
