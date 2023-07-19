import { prepReq } from "../lib/prep-req.js";

const server = Bun.serve({
  fetch(raw) {
    const req = prepReq(raw);

    return new Response(req.url.pathname);
  },
});

console.log(`Started http://localhost:${server.port}`);
