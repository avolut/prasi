const w = window as unknown as any;

export const navOverride = () => {
  if (!w.navigateOverride) {
    w.navigateOverride = (_href: string) => {
      if (_href.startsWith("/")) {
        if (w.basepath.length > 1) {
          _href = `${w.basepath}${_href}`;
        }
        if (
          location.hostname === "prasi.app" ||
          location.hostname === "localhost" ||
          location.hostname === "127.0.0.1" ||
          location.hostname === "10.0.2.2" // android localhost
        ) {
          if (
            location.pathname.startsWith("/site") &&
            !_href.startsWith("/site")
          ) {
            const patharr = location.pathname.split("/");
            _href = `/site/${patharr[2]}${_href}`;
          }
        }
      }
      return _href;
    };
  }
};
