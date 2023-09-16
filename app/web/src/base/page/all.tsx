import { page } from "web-init";

export default page({
  url: "*",
  component: ({}) => {
    navigate("/login");
    return <div>Loading...</div>;
  },
});
