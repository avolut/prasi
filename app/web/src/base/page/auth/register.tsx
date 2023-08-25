import { page } from "web-init";
import { useLocal } from "web-utils";
import { Loading } from "../../../utils/ui/loading";
import { formStyle } from "../../../utils/ui/form.style";
import { Input } from "../../../utils/ui/form/input";

export default page({
  url: "/register",
  component: ({}) => {
    const form = useLocal(
      {
        username: "",
        password: "",
        email: "",
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
            const s = await api.register({
              username: form.username,
              password: form.password,
              email: form.email,
            });

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
          <div className="title">Register</div>
          <label className="mt-3">
            <span>Username</span>
            <Input form={form} name="username" />
          </label>
          <label>
            <span>Password</span>
            <Input form={form} name="password" type="password" />
          </label>
          <label>
            <span>Email</span>
            <Input form={form} name="email" />
          </label>
          <button type="submit" disabled={form.submitting}>
            {form.submitting ? "Loading..." : "Submit"}
          </button>

          <div className="pt-2">
            <a href="/login" className="cursor-pointer underline">
              Login
            </a>
          </div>
        </form>
      </div>
    );
  },
});
