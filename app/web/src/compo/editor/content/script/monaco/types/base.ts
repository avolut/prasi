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
const navigate: (url:string) => void;
const PassProp: FC<Record<string,any> & {children: React.ReactNode}>;

const props: {
  className: string;
  onPointerDown?: () => void;
  onPointerMove?: () => void;
  onPointerLeave?: () => void;
}; 
const children: ReactNode; 
const Local: <T extends Record<string, any>>(arg: {
  name: string;
  value: T;
  children: ReactNode;
  effect?: (
    local: T & { render: () => void }
  ) => void | (() => void) | Promise<void | (() => void)>;
}) => ReactNode

`;
