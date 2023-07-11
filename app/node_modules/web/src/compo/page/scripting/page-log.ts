if (!(window as any)._PrasiPageLog) {
  (window as any)._PrasiPageLog = {
    output: "",
    shouldClear: true,
    render: () => {},
    refresh: () => {},
  };
}

export const PageLog = (window as any)._PrasiPageLog as unknown as {
  output: string;
  shouldClear: boolean;
  render: () => void;
  refresh: (slow?: boolean) => void;
};
