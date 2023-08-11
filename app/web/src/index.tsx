import { initApp } from "web-init/app";
import { App } from "./app";
import "./index.css";

const g = (isSSR ? {} : window) as any;

g.siteApiUrl = "https://api.prasi.app";
// g.siteApiUrl = "http://localhost:12300";
initApp("web", App);

declare global {
  const siteApiUrl: string;
}
