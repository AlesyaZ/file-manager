import os from "node:os";

const { stdin, stdout, stderr, argv } = process;

const prefix = "--username=";
const dataArgv = argv.slice(2).toString();
let userName = dataArgv.replace(/--username=/g, "");

try {
  if (!dataArgv.startsWith(prefix)) {
    throw new Error("Invalid data");
  }
  stdout.write(`Welcome to the File Manager, ${userName}! \n`);
  process.chdir(os.homedir());
  stdout.write(`You are currently in ${process.cwd()} \n`);
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

stdin.on("data", (data) => {
  const enterText = data.toString();

  if (enterText.trim() === ".exit") {
    exitManager(userName);
  }
});

process.on("error", (err) => {
  console.log(err.message);
});
