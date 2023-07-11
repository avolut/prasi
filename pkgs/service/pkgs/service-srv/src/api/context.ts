import { Request, Response } from "hyper-express";

export type APIContext = {
  req: Request;
  res: Response;
  mode: "dev" | "prod" | "staging";
};

export const apiContext = (obj: any): APIContext => {
  return obj as APIContext;
};
