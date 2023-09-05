import { apiContext } from "service-srv";
export const _ = {
  url: "/spa-export/:site_id",
  async api(site_id: string) {
    const { res, req } = apiContext(this);

    if (typeof req.query_parameters["open"] !== "string") {
      res.setHeader("content-disposition", `attachment; filename="Prasi.tsx"`);
    }
    return `\
import React, {
  FC,
  ReactElement,
  useEffect,
  useState
} from "react";
import ReactDOMServer from "react-dom/server";
import JSXRuntime from "react/jsx-runtime";

const PRASI_BASE_URL = "https://api.prasi.id";
const SITE_ID = "${site_id}";
const w = window as any;

type PrasiOpt = {
  showLoading?: boolean;
  exports?: any;
  baseUrl?: string;
};

export const Prasi: FC<{
  ui?: {
    loading: ReactElement;
    notfound: ReactElement;
  };
  pathname?: string;
  pageId?: string;
  exports?: any;
  apiUrl?: string;
}> = ({ ui, pathname, pageId }) => {
  const [_, render] = useState({
    el: ui?.loading || <></>,
  });
  w.React = React;
  w.JSXRuntime = JSXRuntime;
  w.ReactDOMServer = ReactDOMServer;

  useEffect(() => {
    if (!document.getElementById("prasi-loader")) {
      //inject js
      const script = document.createElement("script");
      script.id = "prasi-loader";
      script.src = \`\${PRASI_BASE_URL}/spa-raw/\${SITE_ID}/index.js\`;
      if (pathname) {
        script.src += \`?pathname=\${pathname}\`;
      } else if (pageId) {
        script.src += \`?page_id=\${pageId}\`;
      }
      script.onload = () => {
        const BaseComp = w.PrasiBaseComponent;
        render({ el: <BaseComp /> });
      };
      document.body.appendChild(script);

      //inject style
      const style = document.createElement("link");
      style.rel = "stylesheet";
      style.href = \`\${PRASI_BASE_URL}/spa-raw/\${SITE_ID}/index.css\`;
      document.head.appendChild(style);
    }
  }, []);

  return _.el;
};

export default Prasi;
    `;
  },
};
