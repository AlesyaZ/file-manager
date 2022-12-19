import { rename } from "fs/promises";
import path from "path";

export default function rn(pathFile, nameFile) {
  try {
    if (!pathFile || !nameFile) {
      return "Invalid input";
    }

    const pathDir = path.parse(pathFile).dir;

    rename(pathFile, path.join(pathDir, nameFile));
  } catch {
    console.log("Operation failed!");
  }
}
