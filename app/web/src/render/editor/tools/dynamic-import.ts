function toAbsoluteURL(url: string) {
  const a = document.createElement("a");
  a.setAttribute("href", url); // <a href="hoge.html">
  return (a.cloneNode(false) as any).href; // -> "http://example.com/hoge.html"
}

export function importModule(url: string) {
  return new Promise((resolve, reject) => {
    const vector = "$importModule$" + Math.random().toString(32).slice(2);
    const script = document.createElement("script");
    const destructor = () => {
      delete (window as any)[vector];
      script.onerror = null;
      script.onload = null;
      script.remove();
      URL.revokeObjectURL(script.src);
      script.src = "";
    };
    script.defer = true;
    script.type = "module";
    script.onerror = () => {
      reject(new Error(`Failed to import: ${url}`));
      destructor();
    };
    script.onload = () => {
      resolve((window as any)[vector]);
      destructor();
    };
    const absURL = toAbsoluteURL(url);
    const loader = `import * as m from "${absURL}"; window.${vector} = m;`; // export Module
    const blob = new Blob([loader], { type: "text/javascript" });
    script.src = URL.createObjectURL(blob);

    document.head.appendChild(script);
  });
}

export default importModule;
