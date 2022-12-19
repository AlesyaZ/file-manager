import os from "node:os";
import { MESSAGE_INVALID } from "../../constants.js";

const { stdout } = process;

export default async function osValue(operation) {
  const cpusResult = () => {
    const cpus = os.cpus();

    const result = cpus.map((list) => {
      return {
        model: list.model.trim(),
        speed: list.speed / 1000 + " GHz",
      };
    });
    return result;
  };

  const resultEol = JSON.stringify(os.EOL);
  const homedir = os.homedir();
  const resultUsername = os.userInfo().username;
  const architecture = os.arch();

  switch (operation) {
    case "--EOL": {
      stdout.write(`${resultEol} \n`);
      break;
    }
    case "--cpus": {
      console.table(cpusResult());
      break;
    }
    case "--homedir": {
      stdout.write(`${homedir} \n`);
      break;
    }
    case "--username": {
      stdout.write(`${resultUsername} \n`);
      break;
    }
    case "--architecture": {
      stdout.write(`${architecture} \n`);
      break;
    }
    default: {
      console.log(MESSAGE_INVALID);
    }
  }
}
