import { page } from "web-init";
import { Preview } from "../../render/preview/preview";
import { validate } from "uuid";

export default page({
  url: "/preview/:domain/**",
  component: ({}) => {
    params.site_id = params.domain;
    if (validate(params._)) {
      params.page_id = params._;
    }

    return (
      <Preview
        domain={params.domain}
        pathname={`/${params._ === "_" ? "" : params._}`}
      />
    );
  },
});
