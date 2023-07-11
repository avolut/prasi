import { Request, Response } from "hyper-express";
import { OnRequestSSR } from "web-types";

export const ssr = (arg: { path: string; onRequest: OnRequestSSR }) => {
  return arg;
};
