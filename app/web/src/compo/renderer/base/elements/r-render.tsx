import { FC, useEffect, useRef, useState } from "react";
import { useGlobal } from "web-utils";
import { IContent } from "../../../types/general";
import { RendererGlobal } from "../renderer-global";
import { produceCSS } from "../../../page/css/gen";

export const RRender: FC<{ item: IContent }> = ({ item }) => {
  const rg = useGlobal(RendererGlobal, "PRASI_SITE");
  const [_, setRender] = useState({});
  const ref = useRef({ mounted: true });
  const render = () => {
    if (ref.current.mounted) {
      setRender({});
    }
  };
  useEffect(() => {
    return () => {
      ref.current.mounted = false;
    };
  }, []);

  const className = [produceCSS(item, { mode: rg.mode })];

  return <></>;
};
