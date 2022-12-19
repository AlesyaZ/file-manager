import fs from "node:fs";
import { createHash } from "node:crypto";

export const hash = "SHA256";

export const calculateHash = (file) => {
  try {
    const fileText = fs.createReadStream(file, { encoding: "utf8" });
    fileText.on("data", (data) => {
      console.log(createHash(hash).update(data).digest("hex"));
    });
  } catch {
    console.log("Operation failed!");
  }
};
