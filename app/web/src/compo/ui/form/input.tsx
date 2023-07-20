import { FC } from "react";

export const Input: FC<
  Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "form" | "name" | "onChange"
  > & {
    form: Record<string, any> & { render: () => void };
    name: string;
    onChange?: (text: string) => string | void;
  }
> = (arg) => {
  const prop: any = { ...arg };
  const { form, name } = arg;
  delete prop.form;
  delete prop.name;

  let onChange: ((text: string) => string) | null = null;
  if (prop.onChange) {
    onChange = prop.onChange;
    delete prop.onChange;
  }

  return (
    <input
      value={form[name] || ""}
      spellCheck={false}
      onInput={(e) => {
        form[name] = e.currentTarget.value;

        if (onChange) {
          const result = onChange(e.currentTarget.value);
          if (typeof result !== "undefined") {
            form[name] = result;
          }
        }

        form.render();
      }}
      {...prop}
    />
  );
};
