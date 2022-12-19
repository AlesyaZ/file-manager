import { createReadStream, createWriteStream } from "fs";
import { ERROR_OPERATION, MESSAGE_INVALID } from "../../constants.js";
import path from "path";

const { cwd } = process;

export function checkPath(pathFile) {
  if (pathFile === path.isAbsolute(pathFile)) {
    return pathFile;
  } else {
    path.join(cwd(), pathFile);
  }
}

export const cp = async (file, pathCpFile) => {
  checkPath(file);
  checkPath(pathCpFile);
  const fileName = path.parse(file).base;

  try {
    if (pathCpFile && file) {
      const read = await createReadStream(file);
      const write = await createWriteStream(
        `${pathCpFile}${path.sep}${fileName}`,
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
        read.close();
        console.log(ERROR_OPERATION);
      });

      read.on("end", async () => {
        write.end();
      });
    } else {
      console.log(ERROR_OPERATION);
    }
  } catch (err) {
    if (err) console.log(MESSAGE_INVALID);
  }
};
