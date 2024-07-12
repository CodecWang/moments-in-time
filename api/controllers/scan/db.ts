import { promises as fs } from "fs";

const filePath = "/Users/arthur/coding/moments-in-time/api/fake-data/db.json";

export async function readJsonFile() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (err) {
    console.error("error", err);
  }
}

export async function writeJsonFile(data: any) {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, jsonString, "utf8");
    return true;
  } catch (err) {
    console.error("error:", err);
    return false;
  }
}
