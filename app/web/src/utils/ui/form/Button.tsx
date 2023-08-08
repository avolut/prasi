import { FC, ReactNode } from "react";

type ButtonProp = {
  disabled?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  appearance?: "secondary" | "subtle";
  children?: ReactNode;
};
export const Button: FC<ButtonProp> = ({
  children,
  appearance,
  className,
  onClick,
}) => {
  return (
    <button
      className={cx(
        "transition-all flex items-center justify-center border select-none outline-none prasi-btn",
        css`
          height: 25px;
          width: 28px;
        `,
        className,
        appearance !== "subtle"
          ? "bg-white border-[#d1d5db] hover:border-[#ccc] active:bg-[#d1d1d1] focus:border-[#ccc]"
          : "active:bg-[#d1d1d1] hover:bg-white hover:bg-opacity-50 cursor-pointer border-transparent hover:border-blue-100 focus:border-[#ccc]"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
