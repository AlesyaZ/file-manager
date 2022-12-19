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

export const compress = async (pathFile, pathZip) => {
  const pipe = util.promisify(pipeline);
  checkPath(pathZip);
  checkPath(pathFile);
  const fileName = parse(pathFile).base;
  const destinationPath = resolve(`${pathZip}${sep}${fileName}.br`);

  try {
    await pipe(
      fs.createReadStream(pathFile),
      zlib.createBrotliCompress(),
      fs.createWriteStream(destinationPath)
    );
  } catch (err) {
    if (err) stderr.write(ERROR_OPERATION);
  }
};
