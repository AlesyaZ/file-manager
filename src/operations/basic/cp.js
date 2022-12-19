import { resolve } from "path";
import { createReadStream, createWriteStream } from "fs";
import { ERROR_OPERATION, MESSAGE_INVALID } from "../../constants.js";

export default async function cp(file, pathCpFile) {
  let fileName = file.replace(/\\/g, "/").split("/").at(-1);

  if (!pathCpFile || !file) {
    console.log(MESSAGE_INVALID);
  }

  const read = await createReadStream(resolve(file));
  const write = await createWriteStream(resolve(pathCpFile, fileName));

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
  });
}
