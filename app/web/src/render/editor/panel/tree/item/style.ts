export const treeItemStyle = (arg: {
  isComponent: boolean;
  isActive: boolean;
  isHover: boolean;
  isSelect: boolean;
}) => {
  const { isComponent, isActive, isHover, isSelect } = arg;
  return cx(
    "item flex items-stretch cursor-pointer border-b relative ",
    // isParentActive && !isActive && !isHover && "bg-blue-100",
    isComponent && !isActive && !isHover && "bg-purple-50",
    isActive && (isComponent ? "bg-purple-100" : "bg-blue-100"),
    isHover && (isComponent ? "bg-purple-100" : "bg-blue-50"),
    css`
      min-height: 28px;
      > div {
        display: flex;
        align-items: center;
      }

      .action {
        opacity: 0.2;
      }

      .pre-action {
        display: none;
      }

      &:hover {
        .pre-action {
          display: flex;
        }
        .action {
          opacity: 1;
        }
      }
    `
  );
};
