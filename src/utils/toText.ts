import { writeFile } from "node:fs/promises";

export async function createTxtFile(
  content: string,
  filename: string = "keys.txt"
): Promise<void> {
  await writeFile(filename, content, { encoding: "utf8" });
}
