import { apiContext } from "service-srv";
import ts from "typescript";
import { createHash } from "crypto";
export const _ = {
  url: "/site-dts/:site_id",
  async api(site_id: string) {
    const { req, res } = apiContext(this);

    const site = await db.site.findFirst({
      where: { id: site_id },
      select: { js: true },
    });

    if (site && site.js) {
      const options = {
        emitDeclarationOnly: true,
        declaration: true,
      };

      let dts = "";
      const host = ts.createCompilerHost(options);
      host.writeFile = (fileName, contents) => (dts = contents);
      host.readFile = () =>
        (site.js || "") + "\n\nexport const ______: string;";

      const program = ts.createProgram(["sitedts"], options, host);
      program.emit();

      const etag = createHash("md5").update(dts).digest("hex");
      res.setHeader("etag", etag);

      return dts;
    }
    return "";
  },
};
