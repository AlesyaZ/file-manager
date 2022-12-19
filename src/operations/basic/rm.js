import { rm as remove } from "fs/promises";
import { join, isAbsolute } from "path";

export default async function rm(file) {
  let pathAbsl = isAbsolute(file);
  if (pathAbsl === file) {
    pathAbsl = file;
  } else {
    pathAbsl = join(file);
  }

  await remove(pathAbsl);
}
