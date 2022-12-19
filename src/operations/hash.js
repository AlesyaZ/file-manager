import fs from "fs";
import { createHash } from "crypto";
import { join, isAbsolute } from "path";
import { enterDirectory } from "../input.js";
export const hash = "SHA256";

export const calculateHash = async (file) => {
  try {
    let pathAbsl = isAbsolute(file);
    if (pathAbsl === file) {
      pathAbsl = file;
    } else {
      pathAbsl = join(file);
    }

    const fileText = await fs.createReadStream(pathAbsl, { encoding: "utf8" });
    fileText.on("data", (data) => {
      console.log(createHash(hash).update(data).digest("hex"));
      enterDirectory();
    });
    fileText.on("error", () => {
      console.log("Operation failed!");
    });
  } catch {
    console.log("Operation failed!");
  }
};
