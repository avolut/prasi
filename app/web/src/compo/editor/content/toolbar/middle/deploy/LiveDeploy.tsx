import { Popover } from "../../../../../ui/popover";

export const LiveDeploy = () => {
  return (
    <Popover content={<>Hello</>}>
      <Icon />
    </Popover>
  );
};

const Icon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 36 36"
  >
    <path
      fill="currentColor"
      d="M10.52 34h-3a1 1 0 01-.88-1.44L12.55 21H6a1 1 0 01-.85-1.54l10.68-17a1 1 0 01.81-.46h13.43a1 1 0 01.77 1.69L21.78 14h5.38a1 1 0 01.73 1.66l-16.63 18a1 1 0 01-.74.34zm-1.34-2h.91l14.77-16h-5.27a1 1 0 01-.77-1.69L27.88 4H17.19L7.77 19h6.43a1 1 0 01.88 1.44z"
      className="clr-i-outline clr-i-outline-path-1"
    ></path>
    <path fill="none" d="M0 0h36v36H0z"></path>
  </svg>
);
