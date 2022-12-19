import { resolve } from "path";
import { createReadStream, createWriteStream } from "fs";
import { ERROR_OPERATION } from "../../constants.js";
import rm from "./rm.js";

export default async function mv(file, pathFile) {
  let fileName = file.replace(/\\/g, "/").split("/").at(-1);

  if (!pathFile || !file) {
    console.log(ERROR_OPERATION);
  }

  const read = createReadStream(resolve(file));
  const write = createWriteStream(resolve(pathFile, fileName));

  write.write("");

  write.on("error", () => {
    console.log("Invalid input");
  });

  read.on("data", (chunk) => {
    try {
      write.write(chunk);
    } catch (err) {
      console.log("Invalid input");
    }
  });

  read.on("end", async () => {
    write.end();
    rm(file);
  });
}
