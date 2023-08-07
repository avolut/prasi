import { SVGAttributes } from "react";

export function MenuIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 18h16M4 12h16M4 6h16"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}
