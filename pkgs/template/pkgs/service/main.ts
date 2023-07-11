import { createService } from "service";

export const main = createService({
  name: "template_service",
  mode: "single",
  init: async ({ markAsRunning }) => {
    console.log("hello template_service");
    markAsRunning();
  },
});
