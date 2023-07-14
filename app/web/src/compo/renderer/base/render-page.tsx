import { RSection } from "./elements/r-section";
import { RendererGlobal } from "./renderer-global";

export const PrasiPage = (props: {
  rg: typeof RendererGlobal & { render: () => void };
  pathname: string;
}) => {
  const { rg, pathname } = props;
  const { page, ui } = rg;
  const { router } = page;

  if (router) {
    page.active = router.lookup(pathname);
  }

  if (page.active && typeof page.active.content_tree === "undefined") {
    if (!rg.loading) {
      rg.loading = true;
      rg.page.load(page.active.id).then((loadedPage) => {
        if (page.active) {
          page.active.content_tree = loadedPage?.content_tree || null;
          page.active.js_compiled = loadedPage?.js_compiled;
        }
        rg.loading = false;
        rg.render();
      });
    }
  }

  if (rg.loading) return ui.loading || <></>;
  if (!page.active) return ui.notfound;

  return (
    <div className="flex flex-col items-stretch flex-1 bg-white">
      {page.active.content_tree?.childs.map((e) => (
        <RSection key={e.id} item={e} />
      ))}
    </div>
  );
};
