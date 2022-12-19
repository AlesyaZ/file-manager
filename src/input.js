import up from "./operations/nwd/up.js";
import cd from "./operations/nwd/cd.js";
import ls from "./operations/nwd/ls.js";
import add from "./operations/basic/add.js";
import cp from "./operations/basic/cp.js";
import rn from "./operations/basic/rn.js";
import mv from "./operations/basic/mv.js";
import rm from "./operations/basic/rm.js";
import cat from "./operations/basic/cat.js";
import osValue from "./operations/systemInfo/index.js";
import { compress } from "./operations/zip/compress.js";
import { decompress } from "./operations/zip/decompress.js";
import { calculateHash } from "./operations/hash.js";
import { ERROR_OPERATION, MESSAGE_INVALID } from "./constants.js";

const { stdout, cwd } = process;

export const enterDirectory = () => {
  stdout.write(`You are currently in ${cwd()} \n`);
};

export const enterOperations = async (data) => {
  const enterText = data.toString().trim().split(" ");
  switch (enterText[0]) {
    case ".exit": {
      await exitManager(userName);
      break;
    }
    case "up": {
      await up(enterText.toString());
      enterDirectory();
      break;
    }
    case "cd": {
      await cd(enterText[1]);
      break;
    }
    case "ls": {
      await ls(enterText.toString());
      enterDirectory();
      break;
    }
    case "cat": {
      await cat(enterText[1]);
      enterDirectory();
      break;
    }
    case "add": {
      if (enterText.length > 2) {
        console.log(MESSAGE_INVALID);
        return enterDirectory();
      }
      await add(enterText[1]);
    }
    case "rn": {
      await rn(enterText[1], enterText[2]);
      enterDirectory();
      break;
    }
    case "cp": {
      await cp(enterText[1], enterText[2]);
      enterDirectory();
      break;
    }
    case "mv": {
      await mv(enterText[1], enterText[2]);
      enterDirectory();
      break;
    }
    case "rm": {
      await rm(enterText[1]);
      enterDirectory();
      break;
    }
    case "os": {
      if (enterText.length === 2) {
        await osValue(enterText[1]);
      } else {
        stdout.write(`${MESSAGE_INVALID} \n`);
      }
      enterDirectory();
      break;
    }
    case "hash": {
      try {
        await calculateHash(enterText[1]);
      } catch {
        stdout.write(MESSAGE_INVALID);
      }
      enterDirectory();
      break;
    }
    case "compress": {
      await compress(enterText[1], enterText[2]);
      enterDirectory();
      break;
    }
    case "decompress": {
      await decompress(enterText[1], enterText[2]);
      enterDirectory();
      break;
    }
    default: {
      console.log(ERROR_OPERATION);
      enterDirectory();
    }
  }
};
