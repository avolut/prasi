import { CompDoc } from "../../base/global/content-editor";

const defaultComponent = {
  docs: {} as Record<string, CompDoc | null>,
  edit: {
    loading: false,
    id: "",
    tabs: null as null | Set<string>,
    show: false,
    switching: false,
    activatePropEditing: false,
  },
};

if (!(window as any)._componentGlobal) {
  (window as any)._componentGlobal = defaultComponent;
}

export const component = (window as any)
  ._componentGlobal as typeof defaultComponent;
