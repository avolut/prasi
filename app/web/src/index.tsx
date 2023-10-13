import { initApp } from "web-init/app";
import { registerServiceWorker } from "./sworker/register";
import "./index.css";

const g = window as any;

g.siteApiUrl = "https://api.prasi.app";
// g.siteApiUrl = "http://localhost:12300";
initApp("web");
registerServiceWorker();

declare global {
  const siteApiUrl: string;
}
