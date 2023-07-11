import { page } from "web-init";
import { formStyle } from "../../../compo/form.style";
import { useLocal } from "web-utils";
import { Loading } from "../../../compo/ui/loading";
import { Input } from "../../../compo/ui/form/input";

export default page({
  url: "/login",
  component: ({}) => {
    const form = useLocal(
      {
        username: "",
        password: "",
        submitting: false,
        init: false,
      },
      async () => {
        const s = await api.session();

        if (s && s.id) {
          navigate("/editor");
        } else {
          form.init = true;
          form.render();
        }
      }
    );

    if (!form.init) return <Loading />;

    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            form.submitting = true;
            form.render();
            const s = await api.login(form.username, form.password);

            if (s.status === "failed") {
              form.submitting = false;
              form.render();
              alert(s.reason);
            } else {
              navigate("/editor");
            }
          }}
          className={cx("border-[3px] border-black", formStyle)}
        >
          <div className="title">Login</div>
          <label className="mt-3">
            <span>Username</span>
            <Input form={form} name="username" />
          </label>
          <label>
            <span>Password</span>
            <Input form={form} name="password" type="password" />
          </label>
          <button type="submit" disabled={form.submitting}>
            {form.submitting ? "Loading..." : "Submit"}
          </button>

          <div className="pt-2">
            <a href="/register" className="cursor-pointer underline">
              Register
            </a>
          </div>
        </form>
      </div>
    );
  },
});
