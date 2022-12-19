import path from "path";
import { createReadStream, createWriteStream } from "fs";
import { rm as remove } from "fs/promises";
import { ERROR_OPERATION, MESSAGE_INVALID } from "../../constants.js";

export function checkPath(pathFile) {
  if (pathFile === path.isAbsolute(pathFile)) {
    return pathFile;
  } else {
    path.join(process.cwd(), pathFile);
  }
}

export const mv = async (file, pathFile) => {
  checkPath(file);
  checkPath(pathFile);
  const fileName = path.parse(file).base;
  try {
    if (file && pathFile) {
      const read = await createReadStream(file);
      const write = await createWriteStream(
        `${pathFile}${path.sep}${fileName}`,
        { flags: "wx" }
      );

      write.write("");

      write.on("error", () => {
        console.log(ERROR_OPERATION);
      });

      read.on("data", (chunk) => {
        try {
          write.write(chunk);
        } catch (err) {
          console.log(ERROR_OPERATION);
        }
      });

      read.on("error", () => {
        console.log(ERROR_OPERATION);
      });

      read.on("end", async () => {
        remove(file);
        write.end();
      });
    } else {
      console.log(MESSAGE_INVALID);
    }
  } catch (err) {
    if (err) console.log(MESSAGE_INVALID);
  }
};
