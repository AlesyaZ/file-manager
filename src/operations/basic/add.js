import fs from "fs/promises";

export default async function add(fileCreate) {
  if (!fileCreate) {
    return;
  }
  fs.writeFile(fileCreate, "");
}
