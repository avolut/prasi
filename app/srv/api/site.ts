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
    const { req, res } = apiContext(this);
    const { pathname, site_id } = matchRoute(req.params._);

    if (!site_id) {
      return "not found";
    }

    return `\
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <div id="root"></div>
  <script type="module">
    import { renderPrasi } from "/spa/${site_id}/index.js";
    renderPrasi(document.getElementById("root"))
  </script>
</body>
</html>`;
  },
};
