export const baseTypings = `
type FC<T> = React.FC<T>;
const Fragment = React.Fragment;
const ReactNode = React.ReactNode;
const useCallback = React.useCallback;
const useMemo = React.useMemo;
const ReactElement = React.ReactElement;
const isValidElement = React.isValidElement;
const useEffect = React.useEffect;
const useState = React.useState;

const isEditor: boolean;
const isMobile: boolean;
const isDesktop: boolean;
const navigate: (url:string) => void;
const params: any;
const cx = (...classNames: any[]) => string;
const css = (
  tag: CSSAttribute | TemplateStringsArray | string,
  ...props: Array<string | number | boolean | undefined | null>
) => string;

const props: {
  className: string;
  onPointerDown?: () => void;
  onPointerMove?: () => void;
  onPointerLeave?: () => void;
}; 
const children: ReactNode; 

const PassProp: FC<Record<string,any> & {children: React.ReactNode}>;
const PassChild: FC<{name: string}>;
const Preload: FC<{url: string[]}>;
const Local: <T extends Record<string, any>>(arg: {
  name: string;
  value: T;
  children: ((local: T & { render: () => void }) => any);
  effect?: (
    local: T & { render: () => void }
  ) => void | (() => void) | Promise<void | (() => void)>;
  effects?: {
    effect: (
      local: T & { render: () => void }
    ) => void | (() => void) | Promise<void | (() => void)>;
    deps: any[];
  }[]
}) => ReactNode;

`;
