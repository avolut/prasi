import { validate } from "uuid";
import { page } from "web-init";
import { Live } from "../../render/live/live";
import { defaultLoader } from "../../render/live/logic/default-loader";

export default page({
  url: "/live/:domain/**",
  component: ({}) => {
    params.site_id = params.domain;
    if (validate(params._)) {
      params.page_id = params._;
    }

    return (
      <Live
        domain={params.domain}
        pathname={`/${params._ === "_" ? "" : params._}`}
        loader={defaultLoader}
      />
    );
  },
});
