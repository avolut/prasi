import { CompDoc } from "../../base/global/content-editor";

export const component = {
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
