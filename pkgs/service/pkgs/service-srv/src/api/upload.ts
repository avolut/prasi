import { extname, join } from "path";
import { format } from "date-fns";

export type UploadedFile = {
  data: ArrayBuffer;
  name: string;
  filename: string;
  type: string;
};

export const generateUploadPath = (
  file: { name: string; filename: string; type: string; fieldname: string },
  path: string,
  prefix?: string
) => {
  const date = new Date();
  const subdir = join(prefix || "");
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

  const filename =
    file.name.split(".")[0].replace(/[\W_]+/g, "") +
    "-" +
    uniqueSuffix +
    extname(file.filename);

  let mode = "_file";
  if (file.type.includes("image")) {
    mode = "_img";
  }
  const fieldname = file.fieldname || ''

  return {
    url: [`/${mode}`, subdir, fieldname, filename].join("/"),
    path: join(path, subdir, fieldname, filename),
  };
};
