import path from "path";
import { homedir } from "os";
import { MESSAGE_INVALID } from "../../constants.js";

const { cwd } = process;

let currentPath = cwd();
const root = path.parse(homedir());

const up = (input) => {
  if (input !== "up") {
    return console.log(MESSAGE_INVALID);
  } else if (root === cwd()) {
    return cwd();
  } else {
    currentPath = "..";
    process.chdir(currentPath);
  }
};

export default up;
