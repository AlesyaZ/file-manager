import path from "path";
import { createReadStream } from "fs";
import { enterDirectory } from "../../input.js";
import { ERROR_OPERATION } from "../../constants.js";

export default async function cat(file) {
  try {
    let pathAbsl = path.isAbsolute(file);
    if (pathAbsl === file) {
      pathAbsl = file;
    } else {
      pathAbsl = path.join(file);
    }

    const data = await createReadStream(pathAbsl);

    data.on("data", function (chunk) {
      console.log(chunk.toString());
    });
    data.on("close", () => enterDirectory());
    data.on("error", () => console.log(ERROR_OPERATION));
  } catch (err) {
    if (err) stderr.write(ERROR_OPERATION);
  }
}
