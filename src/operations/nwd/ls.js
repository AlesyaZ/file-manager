import { readdir } from "fs/promises";
import { MESSAGE_INVALID } from "../../constants.js";

const { cwd } = process;

function checkType(file) {
  if (file) {
    return "directory";
  } else {
    return "file";
  }
}

const ls = async (input) => {
  if (input !== "ls") {
    return console.log(MESSAGE_INVALID);
  }

  const files = await readdir(cwd(), { withFileTypes: true });

  const valueFile = files.map((file) => ({
    name: file.name,
    type: checkType(file.isDirectory()),
  }));

  const list = [
    ...valueFile.sort((a, b) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      }
      return a.type.localeCompare(b.type);
    }),
  ];

  console.table(list);
};

export default ls;
