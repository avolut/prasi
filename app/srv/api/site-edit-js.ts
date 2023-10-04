import { apiContext } from "service-srv";
import ts from "typescript";

export const _ = {
  url: "/site-edit-js/:site_id",
  async api(site_id: string, src: string, compiled: string) {
    const { req, res } = apiContext(this);

    const options = {
      emitDeclarationOnly: true,
      declaration: true,
    };

    await db.site.update({
      where: { id: site_id },
      data: { js: src || "", js_compiled: compiled || "" },
    });

    let dts = "";
    const host = ts.createCompilerHost(options);
    host.writeFile = (fileName, contents) => (dts = contents);
    host.readFile = () => (src || "") + "\n\nexport const ______: string;";

    const program = ts.createProgram(["sitedts"], options, host);
    program.emit();
    return { dts };
  },
};
