import { describe, expect, it } from "@jest/globals";
import { filterTopLevelDirectories } from "./dir";

describe("filterTopLevelDirectories", () => {
  it("should return remove duplicates", () => {
    const directories = [
      "/project/src",
      "/project/src",
      "/project/assets",
      "/project/assets",
    ];
    const expected = ["/project/src", "/project/assets"];
    const result = filterTopLevelDirectories(directories);
    expect(result).toEqual(expected);
  });

  it("should return only top-level directories from a list of directories", () => {
    const directories = [
      "/project/src",
      "/project/src/components",
      "/project/assets",
      "/project/assets/images",
      "/project/docs",
    ];
    const expected = ["/project/src", "/project/assets", "/project/docs"];
    const result = filterTopLevelDirectories(directories);
    expect(result).toEqual(expected);
  });

  it("should return an empty array when given an empty array", () => {
    const directories: string[] = [];
    const expected: string[] = [];
    const result = filterTopLevelDirectories(directories);
    expect(result).toEqual(expected);
  });

  it("should handle directories with similar names correctly", () => {
    const directories = [
      "/project/src",
      "/project/src2",
      "/project/src2/subdir",
    ];
    const expected = ["/project/src", "/project/src2"];
    const result = filterTopLevelDirectories(directories);
    expect(result).toEqual(expected);
  });

  it("should not consider a directory as a subdirectory of another if it merely starts with the same string", () => {
    const directories = ["/project/src", "/project/src2"];
    const expected = ["/project/src", "/project/src2"];
    const result = filterTopLevelDirectories(directories);
    expect(result).toEqual(expected);
  });
});
