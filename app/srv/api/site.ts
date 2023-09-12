import { apiContext } from "service-srv";
import { matchRoute } from "../edit/spa/match-route";
const cache = {
  ts: 0,
};

export const _ = {
  url: "/site/**",
  async api() {
    const { req, mode } = apiContext(this);
    const { pathname, site_id } = matchRoute(req.params._);

    if (!cache.ts) {
      cache.ts = Date.now();
    }

    if (!site_id) {
      return "not found";
    }
    const serverurl =
      mode === "dev" ? "http://localhost:12300" : `https://api.prasi.app`;
    const reset = typeof req.query_parameters["reset"] === "string";
    return `\
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="${serverurl}/spa/${site_id}/index.css?${
      cache.ts
    }">
</head>
<body class="flex-col flex-1 w-full min-h-screen flex opacity-0">
  <div id="root"></div>
  <script type="module">
    import { renderPrasi } from "${serverurl}/spa/${site_id}/index.js?pathname=${encodeURIComponent(
      `/${pathname}`
    )}${reset || mode === "dev" ? "&reset" : ""}&ts=${cache.ts}";
    renderPrasi(document.getElementById("root"), { 
      baseUrl: "${serverurl}/site/${site_id}"
    })
  </script>
</body>
</html>`;
  },
};
