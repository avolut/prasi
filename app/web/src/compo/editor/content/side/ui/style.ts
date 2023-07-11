export const dropdownProp = {
  className: cx(
    "p-1 border border-gray-300 h-[28px]",
    css`
      input {
        max-width: none;
        width: 87px;
        flex: 1;
      }
    `
  ),
  popover: {
    className: "border border-gray-300",
    itemClassName: cx(
      "text-sm cursor-pointer min-w-[150px] p-1 hover:bg-blue-100",
      css`
        &.active {
          background: #3c82f6;
          color: white;
        }
      `
    ),
  },
};
