import os from "os";
import { enterDirectory, enterOperations } from "./src/input.js";
import { ERROR_OPERATION } from "./src/constants.js";

const { stdin, stdout, stderr, argv } = process;

const prefix = "--username=";
const dataArgv = argv.slice(2).toString();
export let userName = dataArgv.replace(/--username=/g, "");

try {
  if (!dataArgv.startsWith(prefix)) {
    throw new Error("Invalid input");
  }
  stdout.write(`Welcome to the File Manager, ${userName}! \n`);
  process.chdir(os.homedir());
  enterDirectory();
} catch (err) {
  if (err) stderr.write("Invalid input!");
  process.exit();
}

export const exitManager = (name) => {
  console.log(`Thank you for using File Manager, ${name}, goodbye!`);
  process.exit();
};

process.on("SIGINT", () => {
  exitManager(userName);
});

stdin.on("data", async (data) => {
  enterOperations(data);
});

process.on("error", (err) => {
  if (err) stderr.write(ERROR_OPERATION);
});
