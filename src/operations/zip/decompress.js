import fs from "fs";
import zlib from "zlib";
import util from "util";
import { pipeline } from "stream";
import { isAbsolute, join, sep, parse, resolve } from "path";
import { ERROR_OPERATION } from "../../constants.js";

const { stderr, cwd } = process;

export function checkPath(pathFile) {
  if (pathFile === isAbsolute(pathFile)) {
    return pathFile;
  } else {
    join(cwd(), pathFile);
  }
}

export const decompress = async (pathZip, pathFile) => {
  const pipe = util.promisify(pipeline);
  checkPath(pathZip);
  checkPath(pathFile);
  const fileName = parse(pathZip).name;
  const destinationPath = resolve(`${pathFile}${sep}${fileName}`);

  try {
    await pipe(
      fs.createReadStream(pathZip),
      zlib.createBrotliDecompress(),
      fs.createWriteStream(destinationPath)
    );
  } catch (err) {
    if (err) stderr.write(ERROR_OPERATION);
  }
};
