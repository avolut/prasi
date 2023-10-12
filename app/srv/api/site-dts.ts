import { apiContext } from "service-srv";
import ts from "typescript";
import { createHash } from "crypto";

const dts = {} as Record<string, { etag: string; dts: string }>;

export const _ = {
  url: "/site-dts/:site_id",
  async api(site_id: string) {
    const { req, res } = apiContext(this);

    let sent = false;
    if (dts[site_id]) {
      res.setHeader("etag", dts[site_id].etag);

      if (dts[site_id].etag === req.headers["if-none-match"]) {
        res.sendStatus(304);
        sent = true;
      }

      if (!sent) {
        sent = true;
        res.send(dts[site_id].dts);
      }
    }

    const site = await db.site.findFirst({
      where: { id: site_id },
      select: { js: true },
    });

    if (site && site.js) {
      const options = {
        emitDeclarationOnly: true,
        declaration: true,
      };

      let dtsrc = "";
      const host = ts.createCompilerHost(options);
      host.writeFile = (fileName, contents) => (dtsrc = contents);
      host.readFile = () =>
        (site.js || "") + "\n\nexport const ______: string;";

      const program = ts.createProgram(["sitedts"], options, host);
      program.emit();

      const etag = createHash("md5").update(dtsrc).digest("hex");
      if (!sent) res.setHeader("etag", etag);

      dts[site_id] = { etag, dts: dtsrc };

      if (sent) {
        return "";
      }
      return dtsrc;
    }
    res.setHeader("etag", "empty");

    return "";
  },
};
