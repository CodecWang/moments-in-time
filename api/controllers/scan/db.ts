import { promises as fs } from "fs";

export async function readJsonFile(filePath: string) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (err) {
    console.error("error", err);
  }
}

export async function writeJsonFile(data: object, filePath: string) {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, jsonString, "utf8");
    return true;
  } catch (err) {
    console.error("error:", err);
    return false;
  }
}
