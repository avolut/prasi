import { SVGAttributes } from "react";

export function UnwrapIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="23"
      fill="none"
      viewBox="0 0 17 23"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M4 7h-.75A2.25 2.25 0 001 9.25v7.5A2.25 2.25 0 003.25 19h7.5A2.25 2.25 0 0013 16.75v-7.5A2.25 2.25 0 0010.75 7H10m3 3h.75A2.25 2.25 0 0116 12.25v7.5A2.25 2.25 0 0113.75 22h-7.5A2.25 2.25 0 014 19.75V19M10 4L7 1m0 0L4 4m3-3v12.75"
      ></path>
    </svg>
  );
}
