import { resolve } from "path";
import { createReadStream, createWriteStream } from "fs";

export default async function cp(file, pathCpFile) {
  let fileName = file.replace(/\\/g, "/").split("/").at(-1);

  if (!pathCpFile || !file) {
    console.log("Invalid input");
  }

  const read = createReadStream(resolve(file));
  const write = createWriteStream(resolve(pathCpFile, fileName));

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
  });
}
