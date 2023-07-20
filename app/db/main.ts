import { createDB } from "service-db";

export const main = createDB({
  name: "db",
});
setTimeout(() => {
  console.log("exiting");
  process.exit();
}, 5000);
