import { ERROR_OPERATION } from "../../constants.js";

const { stderr, stdout } = process;

const cd = async (path) => {
  try {
    process.chdir(path);
  } catch (err) {
    if (err) stderr.write(ERROR_OPERATION);
  } finally {
    stdout.write(`You are currently in ${process.cwd()} \n`);
  }
};

export default cd;
