import { page } from "web-init";
import { useLocal } from "web-utils";

export default page({
  url: "*",
  component: (rawProps) => {
    const local = useLocal({ w: 3, h: 144 }, async () => {
      let res = calculateAspectRatioFit({
        srcWidth: local.w,
        srcHeight: local.h,
        maxWidth: local.w,
        maxHeight: 142,
      });
    });
    const calculateAspectRatioFit = (props: {
      srcWidth: number;
      srcHeight: number;
      maxWidth: number;
      maxHeight: number;
    }) => {
      const { srcWidth, srcHeight, maxWidth, maxHeight } = props;
      var height =
        srcHeight === maxHeight ? (maxWidth * srcHeight) / srcWidth : maxHeight;
      var width =
        srcWidth === maxWidth ? maxHeight * (srcWidth / srcHeight) : maxWidth;
      return {
        width: Number(width.toFixed(2)),
        height: Number(height.toFixed(2)),
      };
    };
    return <></>;
  },
});
