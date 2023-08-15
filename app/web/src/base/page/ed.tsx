import { page } from "web-init";
import { Loading } from "../../utils/ui/loading";

export default page({
  url: "/ed/:site_id/:page_id",
  component: ({}) => {
    navigate(`/editor/${params.site_id}/${params.page_id}`);
    return <Loading />;
  },
});
