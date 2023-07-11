import { useEffect } from "react";
import { SSR } from "service-web/pkgs/web-types";
import { Root, ServerScript, setupEnv } from "web-init";
import { Loading } from "./compo/ui/loading";

setupEnv();

export const App: SSR["App"] = ({
  initScript,
  name,
  props,
  res: req,
  onlyRoot,
  indexCSS,
}) => {
  useEffect(() => {
    document.body.style.opacity = "1";
  }, []);

  const root = (
    <Root name={name} loading={<Loading />} props={props} res={req} />
  );

  if (onlyRoot) return root;

  let title = "Prasi: Create Your Web";

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <link rel="stylesheet" id="indexCSS" href={`/${indexCSS}`} />
      </head>

      <body
        className={cx("flex-col flex-1 w-full min-h-screen flex", "opacity-0")}
      >
        <div id="root">{!isSSR ? root : null}</div>
        <ServerScript source={initScript} />
      </body>
    </html>
  );
};
