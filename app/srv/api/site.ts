import { apiContext } from "service-srv";
import { matchRoute } from "../edit/spa/match-route";
import { readAsync } from "fs-jetpack";
import { dir } from "dir";
const cache = {
  md5: "",
};

export const _ = {
  url: "/site/**",
  async api() {
    const { req, res, mode } = apiContext(this);
    const { pathname, site_id } = matchRoute(req.params._);

    if (!site_id) {
      return "not found";
    }
    const serverurl =
      mode === "dev" ? "http://localhost:12300" : `https://api.prasi.app`;

    return `\
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="${serverurl}/spa/${site_id}/index.css">
</head>
<body class="flex-col flex-1 w-full min-h-screen flex opacity-0">
  <div id="root"></div>
  <script type="module">
    import { renderPrasi } from "${serverurl}/spa/${site_id}/index.js";
    renderPrasi(document.getElementById("root"))
  </script>
</body>
</html>`;
  },
};
