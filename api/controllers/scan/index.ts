import { Context } from "koa";
import { promises as fs } from "fs";
import path from "path";
import { ExifTool } from "exiftool-vendored";
import { IMAGE_EXTENSIONS } from "./media-type";
import { readJsonFile, writeJsonFile } from "./db";
import { getFileHash } from "./hash";

const exifTool = new ExifTool();

async function scanDirectory(db: object, dir: string) {
  const files = await fs.readdir(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      await scanDirectory(db, filePath);
    } else if (IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase())) {
      // @ts-ignore
      if (!db || !db[filePath]) {
        // @ts-ignore
        db[filePath] = {
          hash: await getFileHash(filePath),
          modificationTime: stat.mtime,
          creationTime: stat.birthtime,
          fileSize: stat.size,
          fileName: file,
        };
      } else {
        console.log("file already exists in db: ", filePath);
      }
    }
  }

  return db;
}

export default class ScannerController {
  public static async scan(ctx: Context) {
    const db = await readJsonFile();

    await scanDirectory(
      db,
      "/Users/arthur/coding/photoview/docker-compose/photos"
    );

    const ret = await writeJsonFile(db);
    // const info: any[] = [];
    // for (const filePath of paths) {
    //   const metadata = await exifTool.read(filePath);
    //   info.push(metadata);
    // }
    ctx.body = ret;
  }
}
