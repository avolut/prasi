import { FC } from "react";

export const Input: FC<
  Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "form" | "name" | "onChange"
  > & {
    form: Record<string, any> & { render: () => void };
    name: string;
    onChange?: (text: string) => string;
  }
> = (arg) => {
  const prop: any = { ...arg };
  const { form, name } = arg;
  delete prop.form;
  delete prop.name;

  let onChange: ((text: string) => string) | null = null;
  if (prop.onChange) {
    onChange = null;
    delete prop.onChange;
  }

  return (
    <input
      value={form[name] || ""}
      spellCheck={false}
      onInput={(e) => {
        form[name] = e.currentTarget.value;

        if (onChange) {
          form[name] = onChange(e.currentTarget.value);
        }

        form.render();
      }}
      {...prop}
    />
  );
};
