import { rename } from "fs/promises";
import path from "path";

const { cwd } = process;

export function checkPath(pathFile) {
  if (pathFile === path.isAbsolute(pathFile)) {
    return pathFile;
  } else {
    path.join(cwd(), pathFile);
  }
}

export const rn = async (pathFile, nameFile) => {
  checkPath(pathFile);
  try {
    if (!pathFile || !nameFile) {
      return console.log("Operation failed!");
    }
    const pathDir = path.parse(pathFile).dir;
    await rename(pathFile, path.join(pathDir, nameFile));
  } catch (err) {
    if (err) console.log("Operation failed!");
  }
};
