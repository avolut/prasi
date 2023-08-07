import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTypeahead,
} from "@floating-ui/react";
import {
  Children,
  ReactNode,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";
import "./context-menu.css";

export const MenuItem = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    label: ReactNode;
    disabled?: boolean;
  }
>(({ label, disabled, ...props }, ref) => {
  return (
    <button
      {...props}
      className="MenuItem"
      ref={ref}
      role="menuitem"
      disabled={disabled}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {label}
    </button>
  );
});

interface Props {
  label?: string;
  nested?: boolean;
  mouseEvent: React.MouseEvent<HTMLDivElement, MouseEvent>;
  onClose: () => void;
}

export const Menu = forwardRef<
  HTMLButtonElement,
  Props & Omit<React.HTMLProps<HTMLButtonElement>, "contextMenu">
>(({ children, mouseEvent: contextMenu, onClose }, forwardedRef) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [init, setInit] = useState(false);

  const listItemsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const listContentRef = useRef(
    Children.map(children, (child) =>
      isValidElement(child) ? child.props.label : null
    ) as Array<string | null>
  );
  const allowMouseUpCloseRef = useRef(false);

  const { refs, floatingStyles, context } = useFloating({
    open: contextMenu ? isOpen : true,
    onOpenChange: setIsOpen,
    middleware: [
      offset({ mainAxis: 5, alignmentAxis: 4 }),
      flip({
        fallbackPlacements: ["left-start"],
      }),
      shift({ padding: 10 }),
    ],
    placement: "right-start",
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
  });

  const role = useRole(context, { role: "menu" });
  const dismiss = useDismiss(context);
  const listNavigation = useListNavigation(context, {
    listRef: listItemsRef,
    onNavigate: setActiveIndex,
    activeIndex,
  });
  const typeahead = useTypeahead(context, {
    enabled: isOpen,
    listRef: listContentRef,
    onMatch: setActiveIndex,
    activeIndex,
  });

  const { getFloatingProps, getItemProps } = useInteractions([
    role,
    dismiss,
    listNavigation,
    typeahead,
  ]);

  useEffect(() => {
    const e = contextMenu;
    e.preventDefault();

    refs.setPositionReference({
      getBoundingClientRect() {
        return {
          width: 0,
          height: 0,
          x: e.clientX,
          y: e.clientY,
          top: e.clientY,
          right: e.clientX,
          bottom: e.clientY,
          left: e.clientX,
        };
      },
    });

    setIsOpen(true);

    allowMouseUpCloseRef.current = false;
    function onMouseUp() {
      if (allowMouseUpCloseRef.current) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [refs]);

  useEffect(() => {
    if (!isOpen) {
      if (!init) {
        setInit(true);
        return;
      }
      if (onClose) onClose();
    }
  }, [isOpen]);

  return (
    <FloatingPortal>
      {isOpen && init && (
        // <FloatingOverlay
        //   lockScroll
        //   onContextMenu={(e) => {
        //     e.preventDefault();
        //     e.stopPropagation();
        //     setIsOpen(false);
        //   }}
        // >
        //   <FloatingFocusManager context={context} initialFocus={refs.floating}>
        <div
          className="ContextMenu"
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          onContextMenu={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(false);
          }}
        >
          {Children.map(
            children,
            (child, index) =>
              isValidElement(child) &&
              cloneElement(
                child,
                getItemProps({
                  tabIndex: activeIndex === index ? 0 : -1,
                  ref(node: HTMLButtonElement) {
                    listItemsRef.current[index] = node;
                  },
                  onClick() {
                    child.props.onClick?.();
                    setIsOpen(false);
                  },
                  onMouseUp() {
                    child.props.onClick?.();
                    setIsOpen(false);
                  },
                })
              )
          )}
        </div>
        //   </FloatingFocusManager>
        // </FloatingOverlay>
      )}
    </FloatingPortal>
  );
});
