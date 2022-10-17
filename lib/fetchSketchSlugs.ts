import fs from "fs";
import path from "path";

export const fetchSketchSlugs = () =>
  fs.promises.readdir(path.join(process.cwd(), "sketches"));
