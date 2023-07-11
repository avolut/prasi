import { page } from "web-init";
import { Loading } from "../../../compo/ui/loading";

export default page({
  url: "/logout",
  component: ({}) => {
    api.logout().then(() => {
      location.href = "/login";
    });

    return <Loading />;
  },
});
