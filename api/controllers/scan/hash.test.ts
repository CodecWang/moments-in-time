import { describe, expect, it, jest } from "@jest/globals";
import { calCheckSum } from "./hash";
import crypto from "crypto";

describe("calCheckSum", () => {
  it("should return the correct hash for a given input buffer and algorithm", async () => {
    const data = Buffer.from("test data");
    const algorithm = "md5";
    const expectedHash = crypto
      .createHash(algorithm)
      .update(data)
      .digest("hex");
    const result = await calCheckSum(data, algorithm);
    expect(result).toEqual(expectedHash);
  });

  it("should default to md5 algorithm when no algorithm is specified", async () => {
    const data = Buffer.from("default algorithm test");
    const expectedHash = crypto.createHash("md5").update(data).digest("hex");
    const result = await calCheckSum(data);
    expect(result).toEqual(expectedHash);
  });

  it("should work with different algorithms like sha256", async () => {
    const data = Buffer.from("sha256 test data");
    const algorithm = "sha256";
    const expectedHash = crypto
      .createHash(algorithm)
      .update(data)
      .digest("hex");
    const result = await calCheckSum(data, algorithm);
    expect(result).toEqual(expectedHash);
  });

  it("should handle errors gracefully and log them", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const unsupportedAlgorithm = "unsupported_algo";
    const data = Buffer.from("error handling test");
    const result = await calCheckSum(data, unsupportedAlgorithm);
    expect(consoleSpy).toHaveBeenCalledWith("error:", expect.any(Error));
    expect(result).toBeUndefined();
    consoleSpy.mockRestore();
  });
});
