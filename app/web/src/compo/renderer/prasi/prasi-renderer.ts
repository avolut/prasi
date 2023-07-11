import { Renderer } from "../base/renderer";
import { prasiInit } from "./prasi-init";

export class Prasi extends Renderer {
  constructor(domain: string, page: { id?: string; urlpath?: string }) {
    super();
    prasiInit(domain, page);
  }
}
