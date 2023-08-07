import type { Placement } from "@floating-ui/react";
import {
  FloatingPortal,
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useMergeRefs,
  useRole,
} from "@floating-ui/react";
import * as React from "react";

interface TooltipOptions {
  initialOpen?: boolean;
  placement?: Placement;
  open?: boolean;
  offset?: number;
  onOpenChange?: (open: boolean) => void;
  delay?: number;
  asChild?: boolean;
}

export function useTooltip({
  initialOpen = false,
  placement = "top",
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  delay = 1000,
  offset: tooltipOffset,
}: TooltipOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);

  const arrowRef = React.useRef(null);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(typeof tooltipOffset === "undefined" ? 5 : tooltipOffset),
      flip({
        fallbackAxisSideDirection: "start",
        padding: 5,
      }),
      shift({ padding: 5 }),
      arrow({ element: arrowRef }),
    ],
  });

  const context = data.context;

  const hover = useHover(context, {
    move: false,
    delay,
    enabled: controlledOpen == null,
  });
  const focus = useFocus(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const interactions = useInteractions([hover, focus, dismiss, role]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      arrowRef,
      ...interactions,
      ...data,
    }),
    [open, setOpen, arrowRef, interactions, data]
  );
}

type ContextType = ReturnType<typeof useTooltip> | null;

const TooltipContext = React.createContext<ContextType>(null);

export const useTooltipContext = () => {
  const context = React.useContext(TooltipContext);

  if (context == null) {
    throw new Error("Tooltip components must be wrapped in <Tooltip />");
  }

  return context;
};

export function Tooltip({
  children,
  content,
  className,
  onClick,
  onPointerEnter,
  onPointerLeave,
  asChild,
  ...options
}: {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  onPointerEnter?: (e: React.MouseEvent) => void;
  onPointerLeave?: (e: React.MouseEvent) => void;
} & TooltipOptions) {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const tooltip = useTooltip(options);

  if (!content)
    return (
      <div className={className} onClick={onClick}>
        {children}
      </div>
    );

  return (
    <TooltipContext.Provider value={tooltip}>
      <TooltipTrigger
        onClickCapture={onClick}
        {...{ onPointerEnter, onPointerLeave }}
        className={className}
        asChild={asChild}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent
        className={cx(
          css`
            pointer-events: none;
            position: relative;
            background: white;
            padding: 3px 8px;
            box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.15);
            font-size: 12px;
          `
        )}
      >
        {content}
        <TooltipArrow />
      </TooltipContent>
    </TooltipContext.Provider>
  );
}

function TooltipArrow() {
  const context = useTooltipContext();
  const { x: arrowX, y: arrowY } = context.middlewareData.arrow || {
    x: 0,
    y: 0,
  };
  const staticSide = mapPlacementSideToCSSProperty(context.placement) as string;

  return (
    <div
      ref={context.arrowRef}
      style={{
        left: arrowX != null ? `${arrowX}px` : "",
        top: arrowY != null ? `${arrowY}px` : "",
        [staticSide]: "-4px",
        transform: "rotate(45deg)",
      }}
      className={cx(
        css`
          pointer-events: none;
          position: absolute;
          width: 10px;
          height: 10px;
          background: white;
        `
      )}
    />
  );
}

function mapPlacementSideToCSSProperty(placement: Placement) {
  const staticPosition = placement.split("-")[0];

  const staticSide = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right",
  }[staticPosition];

  return staticSide;
}

export const TooltipTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & { asChild?: boolean }
>(function TooltipTrigger({ children, asChild = false, ...props }, propRef) {
  const context = useTooltipContext();
  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        "data-state": context.open ? "open" : "closed",
      })
    );
  }

  return (
    <div
      ref={ref}
      // The user can style the trigger based on the state
      data-state={context.open ? "open" : "closed"}
      {...context.getReferenceProps(props as any)}
    >
      {children}
    </div>
  );
});

export const TooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(function TooltipContent(props, propRef) {
  const context = useTooltipContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  if (!context.open) return null;

  return (
    <FloatingPortal>
      <div
        ref={ref}
        style={context.floatingStyles}
        {...context.getFloatingProps(props as any)}
      />
    </FloatingPortal>
  );
});
