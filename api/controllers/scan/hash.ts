import { promises as fs } from "fs";
import crypto from "crypto";
// const crypto = require('crypto');

export async function getFileHash(filePath: string, algorithm = "sha256") {
  try {
    const data = await fs.readFile(filePath);

    const hash = crypto.createHash(algorithm);

    hash.update(data);

    const fileHash = hash.digest("hex");

    return fileHash;
  } catch (err) {
    console.error("error:", err);
  }
}
