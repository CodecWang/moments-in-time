import { Context } from "koa";
import { promises as fs } from "fs";
import path from "path";
import { IMAGE_EXTENSIONS } from "../../configs";
import { updateDB } from "./db";
import { filterTopLevelDirectories } from "./dir";

export default class ScannerController {
  public static async scan(ctx: Context) {
    console.time("executionTime");

    const scannedFiles: Photo[] = [];
    const originalDirs = [
      "/Users/arthur/coding/moments-in-time/photos/all",
      // "/Users/arthur/coding/moments-in-time/photos/samples",
    ];
    const dirs = filterTopLevelDirectories(originalDirs);

    const operations = dirs.map((dir) => scanDirectory(dir, scannedFiles));
    await Promise.all(operations);

    const ret = await updateDB(scannedFiles);

    console.timeEnd("executionTime");
    ctx.body = ret;
  }
}

async function scanDirectory(dir: string, scannerFiles: Photo[]) {
  const files = await fs.readdir(dir);

  // Convert each file operation into a promise but don't await here
  const operations = files.map(async (file) => {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);

    // Recursively scan directories
    if (stat.isDirectory()) {
      return scanDirectory(filePath, scannerFiles);
    }

    if (!IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase())) {
      return;
    }

    // Push file details to scannerFiles
    scannerFiles.push({
      path: filePath,
      filename: file,
      createdTime: stat.birthtime.toISOString(),
      modifiedTime: stat.mtime.toISOString(),
    });
  });

  // Wait for all operations (both directory traversals and file processing) to complete
  await Promise.all(operations);
}
