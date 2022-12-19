import { resolve } from "path";
import { createReadStream, createWriteStream } from "fs";
import { ERROR_OPERATION } from "../../constants.js";

export default function cp(file, pathCpFile) {
  let filename = file.replace(/\\/g, "/");
  filename.split("/").at(-1);

  if (!pathCpFile || !file) {
    console.log(ERROR_OPERATION);
  }

  const read = createReadStream(resolve(file));
  const write = createWriteStream(resolve(pathCpFile, filename));

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
    write.write(chunk);
  });

  read.on("end", async () => {
    write.end();
  });
}
