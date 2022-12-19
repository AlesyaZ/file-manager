import os from "node:os";
import up from "./src/operations/nwd/up.js";
import cd from "./src/operations/nwd/cd.js";
// import { calculateHash } from "./src/operations/hash.js";

const { stdin, stdout, stderr, argv, cwd } = process;

const prefix = "--username=";
const dataArgv = argv.slice(2).toString();
let userName = dataArgv.replace(/--username=/g, "");

const enterDirectory = () => {
  stdout.write(`You are currently in ${cwd()} \n`);
};
try {
  if (!dataArgv.startsWith(prefix)) {
    throw new Error("Invalid data");
  }
  stdout.write(`Welcome to the File Manager, ${userName}! \n`);
  process.chdir(os.homedir());
  enterDirectory();
  //operations
} catch (err) {
  if (err) stderr.write("Invalid input!");
  process.exit();
}

const exitManager = (name) => {
  console.log(`Thank you for using File Manager, ${name}, goodbye!`);
  process.exit();
};

process.on("SIGINT", () => {
  exitManager(userName);
});

stdin.on("data", async (data) => {
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
    // case "hash": {
    //   calculateHash(enterText[1]);
    //   enterDirectory();
    //   break;
    // }
  }
});

process.on("error", (err) => {
  console.log(err.message);
});
