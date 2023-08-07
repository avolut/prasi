import { page } from "web-init";
import { Preview } from "../../render/preview/preview";

export default page({
  url: "/preview/:domain/**",
  component: ({}) => {
    return (
      <Preview
        domain={params.domain}
        pathname={`/${params._ === "_" ? "" : params._}`}
      />
    );
  },
});
