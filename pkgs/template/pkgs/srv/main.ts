import { createAPIServer } from "service-srv";

export const main = createAPIServer({
  name: "template_service",
  port: 12300,
  // make sure cookieKey is different for each app
  // changing cookie key, will force all user to log out
  cookieKey: `ryl-sid-JgvCz3F4K6pfPNwM`,
});
