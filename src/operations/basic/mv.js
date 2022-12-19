import { resolve } from "path";
import { createReadStream, createWriteStream } from "fs";
import { ERROR_OPERATION, MESSAGE_INVALID } from "../../constants.js";
import rm from "./rm.js";

export const mv = async (file, pathFile) => {
  let fileName = file.replace(/\\/g, "/").split("/").at(-1);

  if (!pathFile || !file) {
    console.log(MESSAGE_INVALID);
  }

  const read = await createReadStream(resolve(file));
  const write = await createWriteStream(resolve(pathFile, fileName));

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

  read.on("end", async () => {
    write.end();
    rm(file);
  });
};
