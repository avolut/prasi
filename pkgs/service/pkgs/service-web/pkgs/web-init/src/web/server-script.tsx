import { css, CSSAttribute, extractCss } from "goober";
import { FC, lazy } from "react";

export const ServerScript: FC<{ source: string }> = ({ source }) => {
  return (
    <script id="_royal_" dangerouslySetInnerHTML={{ __html: source }}></script>
  );
};

export const setupEnv = () => {
  const g = (isSSR ? globalThis : window) as any;
  g.css = (
    tag: CSSAttribute | TemplateStringsArray | string,
    ...props: Array<string | number | boolean | undefined | null>
  ) => {
    const classes: (string | number)[] = [];
    const go: string[] = [];

    for (const e of props) {
      if (typeof e === "string") {
        if (e.startsWith("go")) {
          go.push(e);
        } else {
          classes.push(e);
        }
      }
      if (typeof e === "number") classes.push(e);
    }

    return [css(tag, ...classes), ...go].join(" ");
  };
  g.extractCss = extractCss;
};

export const ServerStyle = lazy(() => {
  return new Promise<{
    default: React.ComponentType<any>;
  }>((resolve) => {
    let retry = 0;
    let lastExtract = "";
    const tryExtract = () => {
      try {
        const cssSource = extractCss();

        if (!lastExtract && lastExtract !== cssSource) {
          lastExtract = cssSource;

          setTimeout(() => {
            tryExtract();
          }, 20);
          return;
        } else {
          if (cssSource || retry >= 4) {
            resolve({
              default: () => {
                if (!cssSource) return null;
                return (
                  <style
                    id="_goober"
                    dangerouslySetInnerHTML={{ __html: cssSource }}
                  />
                );
              },
            });
            return;
          }
        }
      } catch (e) {}

      setTimeout(() => {
        retry = retry + 1;
        tryExtract();
      }, 50);
    };
    tryExtract();
  });
});
