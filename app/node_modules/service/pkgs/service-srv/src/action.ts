import { srv } from "./glbsrv";

export const srvAction = {
  serverPort: async () => {
    return srv.port;
  },
  publicURL: async () => {
    return srv.serverURL;
  },
};
