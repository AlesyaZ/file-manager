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
      exitManager(userName);
      break;
    }
    case "up": {
      up(enterText.toString());
      enterDirectory();
      break;
    }
    case "cd": {
      cd(enterText[1]);
      break;
    }
    case "ls": {
      ls(enterText.toString());
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
      add(enterText[1]);
    }
    case "rn": {
      rn(enterText[1], enterText[2]);
      enterDirectory();
      break;
    }
    case "cp": {
      cp(enterText[1], enterText[2]);
      enterDirectory();
      break;
    }
    case "mv": {
      mv(enterText[1], enterText[2]);
      enterDirectory();
      break;
    }
    case "rm": {
      rm(enterText[1]);
      enterDirectory();
      break;
    }
    case "os": {
      if (enterText.length === 2) {
        osValue(enterText[1]);
      } else {
        stdout.write(`${MESSAGE_INVALID} \n`);
      }
      enterDirectory();
      break;
    }
    case "hash": {
      try {
        calculateHash(enterText[1]);
        enterDirectory();
      } catch {
        stdout.write(ERROR_OPERATION);
      }
      break;
    }
  }
};
