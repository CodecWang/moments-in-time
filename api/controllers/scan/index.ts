import { Context } from "koa";
import { promises as fs } from "fs";
import path from "path";
import { ExifTool } from "exiftool-vendored";
import { IMAGE_EXTENSIONS } from "../../configs";
import { readJsonFile, writeJsonFile } from "./db";
import { getFileHash } from "./hash";
import { generateThumbnail } from "./thumbnail";
import { filterTopLevelDirectories } from "./dir";

const exifTool = new ExifTool();

async function scanDirectory(photoTable: Photo[], dir: string) {
  const files = await fs.readdir(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      await scanDirectory(photoTable, filePath);
    } else if (IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase())) {
      const exists = photoTable.find((photo) => photo.path === filePath);
      if (!exists) {
        photoTable.push({
          path: filePath,
          filename: file,
          createdTime: stat.birthtime,
          modifiedTime: stat.mtime,
          // hash: await getFileHash(filePath),
          // fileSize: stat.size,
        });
      } else {
        // console.log("file already exists in db: ", filePath);
      }

      generateThumbnail(filePath);
    }
  }
}

export default class ScannerController {
  public static async scan(ctx: Context) {
    console.time("executionTime");

    const originalDirs = [
      "/Users/arthur/coding/moments-in-time/photos/samples",
    ];
    const dirs = filterTopLevelDirectories(originalDirs);
    const photoJson =
      "/Users/arthur/coding/moments-in-time/api/fake-data/photo.json";

    const photoTable = await readJsonFile(photoJson);

    for (const dir of dirs) {
      await scanDirectory(photoTable, dir);
    }

    const ret = await writeJsonFile(photoTable, photoJson);
    // const info: any[] = [];
    // for (const filePath of paths) {
    //   const metadata = await exifTool.read(filePath);
    //   info.push(metadata);
    // }
    console.timeEnd("executionTime");

    ctx.body = ret;
  }
}
