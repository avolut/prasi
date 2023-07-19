import { renderToStaticMarkup } from "react-dom/server";
import type { PrismaClient } from "../../../app/db/node_modules/.gen/index";

globalThis.window = {} as any;

(async () => {
  (globalThis as any).isSSR = true;
  const { dbClient } = await import(
    "../../../pkgs/service/pkgs/service-web/pkgs/web-init/src/web/db"
  );

  const db = dbClient("db", "http://localhost:12300") as PrismaClient;
  const server = Bun.serve({
    fetch(request) {
      const res = renderToStaticMarkup(<div>Hello World</div>);
      return new Response(res, {
        headers: {
          "content-type": "text/html",
        },
      });
    },
  }); 
  console.log(await db.user.findFirst(), " iasfonasf");

  console.log(`Listening on http://localhost:${server.port}`);
})();
