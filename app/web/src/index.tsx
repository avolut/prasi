import { initApp } from "web-init/app";
import "./index.css";

const g = window as any;

g.siteApiUrl = "https://api.prasi.app";
// g.siteApiUrl = "http://localhost:12300";
initApp("web");

declare global {
  const siteApiUrl: string;
}
