import { Request, Response } from "hyper-express";
import { transformSync } from "esbuild";

const frm = transformSync(
  `\
  (BigInt.prototype).toJSON = function () {
    return "BigInt::" + this.toString();
  };

  const replacer = (key, value) => {
    if (typeof value === "string" && value.startsWith('BigInt::')) {
      return BigInt(value.substr(8));
    }
    return value;
  }

  window.addEventListener('message', (e) => {
    const msg = e.data;
    const init = Object.assign({}, msg.init)

    const url = new URL(msg.input);

    if (init && init.body && init.body instanceof File) {
      const body = new FormData();
      body.append("file", msg.init.body);
      init.body = body;
    } 
    
    fetch(url.pathname, init) 
      .then(async (res) => {
        if (res) {
          const body = await res.text();
          if (res.ok) {
            try {
              parent.postMessage({result: JSON.parse(body, replacer), id: msg.id }, '*')
            } catch(e) {
              parent.postMessage({result: body, id: msg.id }, '*')
            }
          } else {
            try {
              parent.postMessage({error: JSON.parse(body, replacer), id: msg.id }, '*')
            } catch(e) {
              parent.postMessage({error: body, id: msg.id }, '*')
            }
          }
        }
      })
  })
  parent.postMessage('initialized', '*')`,
  { minify: true }
);

export const apiFrm = (req: Request, res: Response) => {
  // TODO: whitelist origin
  const allowUrl = req.headers.origin || req.headers.referer;

  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT");
  res.setHeader("Access-Control-Allow-Headers", "content-type rid");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (allowUrl) {
    res.setHeader("Access-Control-Allow-Origin", allowUrl);
  }

  res.send(`<script>${frm.code}</script>`);
};
