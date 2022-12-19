import up from "./operations/nwd/up.js";
import cd from "./operations/nwd/cd.js";
import ls from "./operations/nwd/ls.js";
import add from "./operations/basic/add.js";
import { cat } from "./operations/basic/cat.js";
import { calculateHash } from "./operations/hash.js";

const { stdout, cwd } = process;

export const enterDirectory = () => {
  stdout.write(`You are currently in ${cwd()} \n`);
};

export const enterOperations = (data) => {
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
    // case "ls": {
    //   ls(enterText.toString());
    //   enterDirectory();
    //   break;
    // }
    // case "cat": {
    //   cat(enterText[1]);
    //   enterDirectory();
    //   break;
    // }
    case "add": {
      add(enterText[1]);
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
