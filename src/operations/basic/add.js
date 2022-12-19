import fs from "fs/promises";

export default function add(fileCreate) {
  if (!fileCreate) {
    return;
  }
  fs.writeFile(fileCreate, "");
}
