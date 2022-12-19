import fs from "fs/promises";
import path from "path";
import { ERROR_OPERATION } from "../../constants.js";

const { stderr, cwd } = process;

export function checkPath(pathFile) {
  if (pathFile === path.isAbsolute(pathFile)) {
    return pathFile;
  } else {
    path.join(cwd(), pathFile);
  }
}

export const add = async (fileCreate) => {
  try {
    if (!fileCreate) {
      return;
    }

    checkPath(fileCreate);
    await fs.writeFile(`${cwd()}${path.sep}${fileCreate}`, "");
  } catch (err) {
    if (err) {
      stderr.write(ERROR_OPERATION);
    }
  }
};
