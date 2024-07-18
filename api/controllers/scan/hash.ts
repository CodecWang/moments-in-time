import crypto from "crypto";

export async function calCheckSum(data: Buffer, algorithm = "md5") {
  try {
    const hash = crypto.createHash(algorithm);
    hash.update(data);
    return hash.digest("hex");
  } catch (err) {
    console.error("error:", err);
  }
}
